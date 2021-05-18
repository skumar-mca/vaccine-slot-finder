import axios from 'axios';
import { useEffect, useState } from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { setItem, getItem } from '../../util/index';

import './header-bar.css';
function HeaderBarComponent(props) {
    let timerRef = null;
    // const interval = 1000 * 60 * 10;
    const maxLocations = 5;
    const oneMinute = 1000 * 60;

    const intervalOptions = [
        {
            value: oneMinute,
            label: '1 Minute'
        },
        {
            value: oneMinute * 2,
            label: '2 Minutes'
        },
        {
            value: oneMinute * 15,
            label: '15 Minutes'
        },
        {
            value: oneMinute * 30,
            label: '30 Minutes'
        },
    ];

    const LOCAL_STORAGE = {
        AUTO_REFRESH_INTERVAL: 'AUTO_REFRESH_INTERVAL',
        EMAIL_ID: 'EMAIL_ID',
        AUTO_REFRESH_FLAG: 'AUTO_REFRESH_FLAG',
        SEARCH_CONDITIONS: 'SEARCH_CONDITIONS',
        STATES: 'STATES'
    }

    const initialSearch = () => {
        const fromCache = getItem(LOCAL_STORAGE.SEARCH_CONDITIONS, []);
        if (fromCache.length > 0) {
            return fromCache.map((itm, idx) => {
                return {
                    id: idx,
                    districtList: itm.districtList,
                    state: itm.state,
                    state_name: itm.state_name,
                    district: itm.district,
                    district_name: itm.district_name,
                    availableSlots: []
                }
            });
        }

        return [{
            id: 0,
            districtList: [],
            state: '',
            district: ''
        }]
    }

    const [statesList, setStatesList] = useState([]);
    const [searchConditions, setSearchConditions] = useState(initialSearch());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isAutoRefresh, setIsAutoRefresh] = useState(true);
    const [emailId, setEmailId] = useState('');
    const [refreshInterval, setRefreshInterval] = useState(oneMinute);

    const loadLastSearchedValues = () => {
        const emailID = getItem(LOCAL_STORAGE.EMAIL_ID, '');
        if (emailID) {
            setEmailId(emailID);
        }

        const autoRefeshFlag = getItem(LOCAL_STORAGE.AUTO_REFRESH_FLAG, false);
        setIsAutoRefresh(autoRefeshFlag);

        const refreshInterval = getItem(LOCAL_STORAGE.AUTO_REFRESH_INTERVAL, oneMinute);
        if (refreshInterval) {
            setRefreshInterval(refreshInterval);
        }
    }

    const getStates = () => {
        const statesFromCache = getItem(LOCAL_STORAGE.STATES, []);
        if (statesFromCache.length > 0) {
            setStatesList(statesFromCache);
            return;
        }

        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states').then((resp) => {
            if (resp && resp.data) {
                const stateListArr = resp.data.states;
                setItem(LOCAL_STORAGE.STATES, stateListArr);
                setStatesList(resp.data.states);
            }
        })
    }


    const getDistricts = (stateId, cb) => {
        const key = `DISTRICTS_${stateId}`
        const fromCache = getItem(key, []);
        if (fromCache.length > 0) {
            cb(fromCache);
            return;
        }

        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + stateId).then((resp) => {
            if (resp && resp.data) {
                const districtListArr = resp.data.districts;
                setItem(key, districtListArr);
                cb(districtListArr);
            }
        })
    }

    const searchDistricts = (evt, currentSearch) => {
        const { value } = evt.target;

        getDistricts(value, (resp) => {

            const currentConditionIndex = searchConditions.findIndex((itm) => itm.id === currentSearch.id);
            if (currentConditionIndex > -1) {
                searchConditions[currentConditionIndex].state = value;
                const stateObj = statesList.find((itm) => itm.state_id == value);
                if (stateObj) {
                    searchConditions[currentConditionIndex].state_name = stateObj.state_name;
                }
                searchConditions[currentConditionIndex].districtList = resp;
            }
            setSearchConditions([...searchConditions]);
            saveSearchConditions(searchConditions);
        })
    }

    const setDistrict = (evt, currentSearch) => {
        const { value } = evt.target;
        const currentConditionIndex = searchConditions.findIndex((itm) => itm.id === currentSearch.id);
        if (currentConditionIndex > -1) {
            searchConditions[currentConditionIndex].district = value;

            const districtObj = searchConditions[currentConditionIndex].districtList.find((itm) => itm.district_id == value);
            if (districtObj) {
                searchConditions[currentConditionIndex].district_name = districtObj.district_name;
            }

        }
        setSearchConditions([...searchConditions]);
        saveSearchConditions(searchConditions);
    }

    const saveSearchConditions = (searchList) => {
        let seachParams = [];
        if (searchList) {
            seachParams = searchList.map((itm) => {
                return {
                    id: itm.id,
                    state: itm.state,
                    state_name: itm.state_name,
                    district: itm.district,
                    district_name: itm.district_name,
                    districtList: itm.districtList,
                    availableSlots: itm.availableSlots
                }
            })
        }
        setItem(LOCAL_STORAGE.SEARCH_CONDITIONS, seachParams);
    }



    const dateToDMY = (date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
    }

    const handleOnSearch = () => {
        const searchParams = getItem(LOCAL_STORAGE.SEARCH_CONDITIONS, []);
        if (searchParams.length > 0) {
            searchParams.map((searchObj) => {
                const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${searchObj.district}&date=${dateToDMY(new Date(selectedDate))}`; //18-05-2021
                axios.get(url).then((resp) => {
                    if (resp && resp.data) {
                        analyzeData(searchObj, resp.data.centers)
                    }
                })
            })

        }
    }

    const analyzeData = (searchObj, data) => {
        const availableSlots = [];
        if (data.length > 0) {
            data.map((center) => {
                let availableSession = [];
                (center.sessions || []).map((session) => {
                    if (session.available_capacity > 0 ||
                        session.available_capacity_dose1 > 0 ||
                        session.available_capacity_dose2 > 0) {
                        availableSession.push(session);

                    }
                })

                if (availableSession.length > 1) {
                    availableSlots.push({
                        center: center,
                        sessions: availableSession
                    });
                }
            })
        }

        const currentConditionIndex = searchConditions.findIndex((itm) => itm.id === searchObj.id);
        if (currentConditionIndex > -1) {
            searchConditions[currentConditionIndex].availableSlots = availableSlots;
            setSearchConditions([...searchConditions]);
            saveSearchConditions(searchConditions);
        }

        if (availableSlots.length > 0) {
            sendEmail(availableSlots);
        }
    }

    const sendEmail = (availableSlots) => {
        if (!emailId) {
            return;
        }

        let message = ``;
        availableSlots && availableSlots.map((avl) => {
            avl.sessions.map((session) => {
                message = `${message}-------------------------------------------------------------------------------------------
            Fee Type: ${avl.center.fee_type}, 
            Fees: ${avl.center.vaccine_fees ? `${avl.center.vaccine_fees[0].fee} (${avl.center.vaccine_fees[0].vaccine})` : '0'},
            Vaccine: ${session.vaccine},
            Age Limit: ${session.min_age_limit},
            Avl Capacity: ${session.available_capacity},
            Dose 1: ${session.available_capacity_dose1},
            Dose 2: ${session.available_capacity_dose2},
            Date: ${session.date},
            Address: ${avl.center.name}, ${avl.center.address}
        `;
            })
        })

        var data = {
            service_id: 'service_d7elxlo',
            template_id: 'template_91dx2y5',
            user_id: 'user_OpcKVh9JRegJpoIecK0rs',
            template_params: {
                'to_email': emailId,
                'from_name': 'Sunil Kumar',
                'message': message
            }
        };

        axios.post('https://api.emailjs.com/api/v1.0/email/send', data
        ).then(() => {
            //alert('Your mail is sent!');
        }).catch((error) => {
            //alert('Oops... ' + JSON.stringify(error));
        });
    }


    const addNewCondition = () => {
        if (searchConditions.length === 5) {
            return;
        }

        const newSearchConsitions = [...searchConditions, {
            id: searchConditions.length,
            districtList: [],
            state: '',
            district: '',
            availableSlots: []
        }];

        setSearchConditions([...newSearchConsitions]);
        saveSearchConditions(newSearchConsitions);
    }

    const deleteCondition = (currentSearch) => {
        if (searchConditions.length === 1) {
            return;
        }

        const currentConditionIndex = searchConditions.findIndex((itm) => itm.id === currentSearch.id);
        if (currentConditionIndex > -1) {
            searchConditions.splice(currentConditionIndex, 1);
        }
        setSearchConditions([...searchConditions]);
        saveSearchConditions(searchConditions);
    }


    const initializeInterval = () => {
        clearInterval();

        timerRef = window.setInterval(() => {
            if (!isAutoRefresh) {
                return false;
            }

            handleOnSearch();
        }, refreshInterval)
    }

    const clearInterval = () => {
        if (timerRef) {
            window.clearInterval(timerRef);
        }
    }


    const onHandleAutoRefresh = (evt) => {
        const { checked } = evt.target;
        setItem(LOCAL_STORAGE.AUTO_REFRESH_FLAG, checked)
        setIsAutoRefresh(checked)
        if (checked) {
            initializeInterval();
        }
    }

    const onHandleEmailChange = (evt) => {
        const { value } = evt.target;
        setItem(LOCAL_STORAGE.EMAIL_ID, value)
        setEmailId(value)
    }

    const onHandleIntervalChange = (evt) => {
        const { value } = evt.target;
        setItem(LOCAL_STORAGE.AUTO_REFRESH_INTERVAL, value)
        setRefreshInterval(value)
        initializeInterval();
    }

    useEffect(() => {
        getStates();
        loadLastSearchedValues();
        initializeInterval();

        return () => {
            clearInterval();
        }
    }, [])

    useEffect(() => {

    }, [searchConditions])

    return (
        <div className="header-section">
            <div className="row form-row">
                {(searchConditions || []).map((srch, index) => {
                    return <div className="col-md-4 col-sm-6" key={srch.id}>

                        <h5>Location {index + 1}
                            {searchConditions.length > 1 && <button className="btn text-danger btn-sm btn-del-location" title="Delete location" onClick={() => { deleteCondition(srch) }}>X</button>}
                            {index === searchConditions.length - 1 && <button className="btn btn-info btn-sm btn-add-location" onClick={addNewCondition}>+ Add Location</button>}

                        </h5>

                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id={`inputGroup-sizing-sm-s-${srch.id}`}>State</span>
                            <select class="form-control" aria-label="Sizing example input" aria-describedby={`inputGroup-sizing-sm-s-${srch.id}`}
                                value={srch.state}
                                onChange={(evt) => {
                                    searchDistricts(evt, srch)
                                }}
                            >
                                <option>Select State</option>
                                {statesList.map((state) => {
                                    return <option value={state.state_id}>{state.state_name}</option>
                                })}
                            </select>

                        </div>


                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id={`inputGroup-sizing-sm-d-${srch.id}`}>District</span>
                            <select class="form-control" aria-label="Sizing example input" aria-describedby={`inputGroup-sizing-sm-d-${srch.id}`}
                                aria-label={`.district-select-sm example`}
                                value={srch.district}
                                onChange={(evt) => {
                                    setDistrict(evt, srch)
                                }}
                            >
                                <option>Select District</option>
                                {srch.districtList && srch.districtList.map((district) => {
                                    return <option value={district.district_id}>{district.district_name}</option>
                                })}
                            </select>
                        </div>

                    </div>
                })}

                <div className='col-md-4 col-sm-6'>

                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id={`inputGroup-sizing-sm-dt`}>Date</span>
                        <div class="form-control" aria-label="Sizing example input" aria-describedby={`inputGroup-sizing-sm-dt`}
                            aria-label={`.district-select-sm example`}>
                            <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="dd-MM-yyyy" />

                        </div>
                    </div>

                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id={`inputGroup-sizing-sm-s-email`}>Notify on email</span>
                        <input class="form-control" aria-label="Sizing example input" aria-describedby={`inputGroup-sizing-sm-email`} placeholder="example@gmail.com"
                            value={emailId}
                            onChange={onHandleEmailChange}
                        />

                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={isAutoRefresh} onChange={onHandleAutoRefresh} />
                                <label class="form-check-label" for="flexCheckChecked">Auto Refresh</label>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id={`inputGroup-sizing-sm-s-interval`}>Interval</span>
                                <select class="form-control" aria-label="Sizing example input" aria-describedby={`inputGroup-sizing-sm-interval`} value={refreshInterval}
                                    onChange={onHandleIntervalChange}
                                >
                                    <option>Select Interval</option>
                                    {intervalOptions.map((opt) => {
                                        return <option value={opt.value}>{opt.label}</option>
                                    })}
                                </select>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 col-sm-6">
                    <button className="btn btn-sm btn-primary btn-block" onClick={handleOnSearch}>Search</button>
                </div>
            </div>

            <div className="row d-md-block d-lg-block d-sm-none d-xs-none d-none">
                {(searchConditions || []).map((srch) => {
                    let ctr = 0;
                    return <div className="col-md-12 slot-result-wrapper">
                        <h4>{srch.state_name} ({srch.district_name})</h4>
                        <table className="table table-dark table-striped table-sm table-hover table-slot-result">
                            <thead>
                                <tr>

                                    <th>#</th>
                                    <th>Fee Type</th>
                                    <th>Fees</th>
                                    <th>Vaccine</th>
                                    <th>Age Limit</th>
                                    <th>Avl Capacity</th>
                                    <th>Avl Dose 1</th>
                                    <th>Avl Dose 2</th>
                                    <th>Date</th>
                                    <th>Address</th>

                                </tr>
                            </thead>
                            <tbody>
                                {(srch.availableSlots || []).length === 0 && <tr><td colSpan="10" className='no-record'>No slots found!</td></tr>}
                                {(srch.availableSlots || []).map((slot) => {
                                    return (slot.sessions || []).map((session, indx) => {
                                        return <tr>
                                            <td>{++ctr}</td>
                                            <td>{slot.center.fee_type}</td>
                                            <td>{slot.center.vaccine_fees ? `${slot.center.vaccine_fees[0].fee} (${slot.center.vaccine_fees[0].vaccine})` : '0'}</td>
                                            <td>{session.vaccine}</td>
                                            <td>{session.min_age_limit}</td>
                                            <td>{session.available_capacity}</td>
                                            <td>{session.available_capacity_dose1}</td>
                                            <td>{session.available_capacity_dose2}</td>
                                            <td>{session.date}</td>
                                            <td>{slot.center.name}, {slot.center.address}</td>

                                        </tr>
                                    })

                                })
                                }
                            </tbody>
                        </table>
                    </div>
                })}
            </div>

            <div className="row d-lg-none d-md-none d-sm-block d-xs-block">
                {(searchConditions || []).map((srch) => {
                    return <div className="col-md-12 slot-result-wrapper">
                        <h4>{srch.state_name} ({srch.district_name})</h4>
                        {(srch.availableSlots || []).length === 0 && <div className='no-record'>No slots found!</div>}
                        <div class="list-group">
                            {(srch.availableSlots || []).map((slot) => {
                                return (slot.sessions || []).map((session, indx) => {
                                    return <a href="javascript:void(0)" class="list-group-item list-group-item-action" aria-current="true">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">
                                                Age Limit: {session.min_age_limit},
                                                Rs. {slot.center.vaccine_fees ? `${slot.center.vaccine_fees[0].fee} (${slot.center.vaccine_fees[0].vaccine})` : '0'}
                                            </h5>
                                            <small>
                                                <span class="badge bg-primary">{slot.center.fee_type}</span>
                                            </small>
                                        </div>
                                        <p class="mb-1">
                                            Available Capacity: {session.available_capacity},{` `}
                                            <b>Dose 1</b>: {session.available_capacity_dose1},{` `}
                                            <b>Dose 2</b>: {session.available_capacity_dose2},
                                                 </p>
                                        <small>Vaccine: {session.vaccine}, Date: {session.date}</small>

                                        <p><small>{slot.center.name}, {slot.center.address}</small></p>
                                    </a>
                                })
                            })
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default HeaderBarComponent;
