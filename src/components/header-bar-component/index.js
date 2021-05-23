import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { setItem, getItem } from '../../util/index';
import "react-datepicker/dist/react-datepicker.css";
import './header-bar.css';
function HeaderBarComponent(props) {
    let timerRef = null;
    const oneMinute = 1000 * 60;

    const intervalOptions = [
        {
            value: oneMinute / 4,
            label: '15 Seconds'
        },
        {
            value: oneMinute / 2,
            label: '30 Seconds'
        },
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
        STATES: 'STATES',
        AGE_LIMIT_18: 'AGE_LIMIT_18',
        AGE_LIMIT_45: 'AGE_LIMIT_45',
        AGE_LIMIT_60: 'AGE_LIMIT_60',
        DOSE_1: 'DOSE_1',
        DOSE_2: 'DOSE_2'
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
    const [isAutoRefresh, setIsAutoRefresh] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState(null);
    const [ageLimit18Plus, setAgeLimit18Plus] = useState(false);
    const [ageLimit45Plus, setAgeLimit45Plus] = useState(false);

    const [dose1, setDose1] = useState(true);
    const [dose2, setDose2] = useState(true);

    const [timeLefToRefreshtMsg, setTimeLefToRefreshtMsg] = useState('');


    const loadLastSearchedValues = () => {
        const autoRefeshFlag = getItem(LOCAL_STORAGE.AUTO_REFRESH_FLAG, false);
        setIsAutoRefresh(autoRefeshFlag);

        const refreshInterval = getItem(LOCAL_STORAGE.AUTO_REFRESH_INTERVAL, oneMinute);
        setRefreshInterval(parseInt(refreshInterval));

        const ageLimit18 = getItem(LOCAL_STORAGE.AGE_LIMIT_18, false);
        setAgeLimit18Plus(ageLimit18);

        const ageLimit45 = getItem(LOCAL_STORAGE.AGE_LIMIT_45, false);
        setAgeLimit45Plus(ageLimit45);

        const firstDose = getItem(LOCAL_STORAGE.DOSE_1, false);
        setDose1(firstDose);

        const secondDose = getItem(LOCAL_STORAGE.DOSE_2, false);
        setDose2(secondDose);
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
                const stateObj = statesList.find((itm) => itm.state_id === parseInt(value));
                if (stateObj) {
                    searchConditions[currentConditionIndex].state_name = stateObj.state_name;
                }

                searchConditions[currentConditionIndex].districtList = resp;

                setSearchConditions((prev) => {
                    return [...searchConditions]
                });
                saveSearchConditions(searchConditions);
            }
        })
    }

    const setDistrict = (evt, currentSearch) => {
        const { value } = evt.target;
        const currentConditionIndex = searchConditions.findIndex((itm) => itm.id === currentSearch.id);
        if (currentConditionIndex > -1) {
            searchConditions[currentConditionIndex].district = value;

            const districtObj = searchConditions[currentConditionIndex].districtList.find((itm) => itm.district_id === parseInt(value));
            if (districtObj) {
                searchConditions[currentConditionIndex].district_name = districtObj.district_name;
            }

        }
        setSearchConditions([...searchConditions]);
        saveSearchConditions(searchConditions);
        handleOnSearch();
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
                const currentConditionIndex = searchConditions.findIndex((itm) => itm.id === searchObj.id);
                if (currentConditionIndex > -1) {
                    searchConditions[currentConditionIndex].isLoading = true;
                    setSearchConditions([...searchConditions]);
                }

                const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${searchObj.district}&date=${dateToDMY(new Date(selectedDate))}`; //18-05-2021
                axios.get(url).then((resp) => {
                    if (resp && resp.data) {
                        analyzeData(searchObj, resp.data.centers)
                    }
                })

                return true;
            })
        }
    }

    const analyzeData = (searchObj, data) => {
        const availableSlots = [];
        let ageFilter = [];

        const age18 = getItem(LOCAL_STORAGE.AGE_LIMIT_18);
        const age45 = getItem(LOCAL_STORAGE.AGE_LIMIT_45);

        const dose1Val = getItem(LOCAL_STORAGE.DOSE_1)
        const dose2Val = getItem(LOCAL_STORAGE.DOSE_2)

        if (age18) {
            ageFilter.push(18);
        }

        if (age45) {
            ageFilter.push(45);
        }

        let totalRecords = 0;
        if (data.length > 0) {
            data.map((center) => {
                let availableSession = [];
                let avlSession = (center.sessions || []);
                if (ageFilter.length > 0) {
                    avlSession = avlSession.filter((itm) => {
                        return ageFilter.indexOf(itm.min_age_limit) > -1
                    })
                }

                if ((dose1Val && !dose2Val) || (dose2Val && !dose1Val)) {
                    if (dose1Val) {
                        avlSession = avlSession.filter((itm) => {
                            return itm.available_capacity_dose1 > 0
                        })
                    }

                    if (dose2Val) {
                        avlSession = avlSession.filter((itm) => {
                            return itm.available_capacity_dose2 > 0
                        })
                    }
                }

                avlSession.map((session) => {
                    if (session.available_capacity_dose1 > 0 ||
                        session.available_capacity_dose2 > 0) {
                        availableSession.push(session);
                    }

                    return true;
                })

                if (availableSession.length > 1) {
                    totalRecords += availableSession.length;
                    availableSlots.push({
                        center: center,
                        sessions: availableSession
                    });
                }

                return true;
            })
        }

        const currentConditionIndex = searchConditions.findIndex((itm) => itm.id === searchObj.id);
        if (currentConditionIndex > -1) {
            searchConditions[currentConditionIndex].isLoading = false;
            searchConditions[currentConditionIndex].availableSlots = availableSlots;
            searchConditions[currentConditionIndex].totalRecords = totalRecords;
            setSearchConditions([...searchConditions]);
            saveSearchConditions(searchConditions);
        }
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

        let ctr = 0;
        timerRef = window.setInterval(() => {
            const isAutoRefreshEnabled = getItem(LOCAL_STORAGE.AUTO_REFRESH_FLAG, false);
            if (isAutoRefreshEnabled) {

                const refIntervalInSeconds = parseInt(refreshInterval) / 1000;
                ctr++;
                if (ctr > refIntervalInSeconds) {
                    ctr = 1;
                }

                let timeLeftBeforeRefresh = refIntervalInSeconds - ctr;

                if (timeLeftBeforeRefresh) {
                    const minutes = Math.floor(timeLeftBeforeRefresh / 60);
                    const seconds = Math.ceil(timeLeftBeforeRefresh % 60);

                    let timeLeftMessage = [];

                    timeLeftMessage.push(minutes < 10 ? `0${minutes}m: ` : `${minutes}m:`);


                    timeLeftMessage.push(seconds < 10 ? `0${seconds}s` : `${seconds}s`);
                    setTimeLefToRefreshtMsg(timeLeftMessage.join(''));
                }

                if (ctr === refIntervalInSeconds) {
                    handleOnSearch();
                }

            } else {
                setTimeLefToRefreshtMsg('');
                ctr = 0;
                return;

            }

        }, 1000)
    }

    const clearInterval = () => {
        if (timerRef) {
            window.clearInterval(timerRef);
        }
    }

    const onHandleAutoRefresh = (evt) => {
        const { checked } = evt.target;
        setItem(LOCAL_STORAGE.AUTO_REFRESH_FLAG, checked)
        setIsAutoRefresh(() => { return checked });
    }

    const onHandleIntervalChange = (evt) => {
        const { value } = evt.target;
        setItem(LOCAL_STORAGE.AUTO_REFRESH_INTERVAL, value)
        setRefreshInterval(() => { return value; })
        window.location.reload();
    }

    const renderLoader = () => {
        return <>
            <button className="btn btn-secodary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
                </span>
                <span className="ml-10">Loading...</span>
            </button>
        </>
    }

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
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
    }, [searchConditions, timeLefToRefreshtMsg, refreshInterval, ageLimit18Plus, ageLimit45Plus])

    useEffect(() => {
        initializeInterval();
    }, [refreshInterval])

    return (
        <div className="header-section">
            <div className="row form-row" key={`result-list`}>
                {(searchConditions || []).map((srch, index) => {
                    return <div className="col-md-4 col-sm-6" key={`${srch.id}-${srch.district}-${index}-main`}>
                        <h5 key={`${srch.id}-${srch.district}-${index}-h5`}>Location {index + 1}
                            {searchConditions.length > 1 && <button className="btn text-danger btn-sm btn-del-location" title="Delete location" onClick={() => { deleteCondition(srch) }}>X</button>}
                            {index === searchConditions.length - 1 && <button className="btn btn-info btn-sm btn-add-location" onClick={addNewCondition}>+ Add Location</button>}

                        </h5>

                        <div className="input-group input-group-sm mb-3" key={`${srch.id}-${srch.district}-${index}-div1`}>
                            <span className="input-group-text" id={`inputGroup-sizing-sm-s-${srch.id}`}>State</span>
                            <select className="form-control" aria-label="Sizing example input" aria-describedby={`inputGroup-sizing-sm-s-${srch.id}`}
                                value={srch.state}
                                onChange={(evt) => {
                                    searchDistricts(evt, srch)
                                }}
                            >
                                <option>Select State</option>
                                {statesList.map((state) => {
                                    return <option value={state.state_id} key={`state-${state.state_id}`}>{state.state_name}</option>
                                })}
                            </select>
                        </div>

                        <div className="input-group input-group-sm mb-3" key={`${srch.id}-${srch.district}-${index}-ig`}>
                            <span className="input-group-text" id={`inputGroup-sizing-sm-d-${srch.id}`}>District</span>
                            <select className="form-control" aria-describedby={`inputGroup-sizing-sm-d-${srch.id}`}
                                aria-label={`.district-select-sm example`}
                                value={srch.district}
                                onChange={(evt) => {
                                    setDistrict(evt, srch)
                                }}
                            >
                                <option>Select District</option>
                                {srch.districtList && srch.districtList.map((district) => {
                                    return <option value={district.district_id} key={`district-${district.district_id}`}>{district.district_name}</option>
                                })}
                            </select>
                        </div>

                    </div>
                })}

                <div className='col-md-4 col-sm-6'>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id={`inputGroup-sizing-sm-dt`}>Date</span>
                        <div className="form-control" aria-describedby={`inputGroup-sizing-sm-dt`}
                            aria-label={`.district-select-sm example`}>
                            <DatePicker selected={selectedDate}
                                onChange={date => {
                                    setSelectedDate(date)
                                    handleOnSearch();
                                }}
                                dateFormat="dd-MM-yyyy"
                            />
                            <span className="float-right"> to <small>{dateToDMY(new Date(selectedDate).addDays(5))}
                            </small></span>
                        </div>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text mr-20" id={`inputGroup-sizing-sm-s-email`}>Age Limit</span>
                        <div className="form-check age-limit-chkbox form-check-inline ml-10">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" checked={ageLimit18Plus} value={ageLimit18Plus} onChange={(evt) => {
                                setAgeLimit18Plus(evt.target.checked)
                                setItem(LOCAL_STORAGE.AGE_LIMIT_18, evt.target.checked);
                                handleOnSearch();
                            }} />
                            <label className="form-check-label" htmlFor="inlineCheckbox1">18+</label>
                        </div>
                        <div className="form-check form-check-inline age-limit-chkbox">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" checked={ageLimit45Plus} value={ageLimit45Plus}
                                onChange={(evt) => {
                                    setAgeLimit45Plus(evt.target.checked)
                                    setItem(LOCAL_STORAGE.AGE_LIMIT_45, evt.target.checked);
                                    handleOnSearch();
                                }}
                            />
                            <label className="form-check-label" htmlFor="inlineCheckbox2">45+</label>
                        </div>
                    </div>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text mr-20" id={`inputGroup-sizing-sm-s-email`}>Dose</span>
                        <div className="form-check age-limit-chkbox form-check-inline ml-10">
                            <input className="form-check-input" type="checkbox" id="dose1" checked={dose1} value={dose1} onChange={(evt) => {
                                setDose1(evt.target.checked)
                                setItem(LOCAL_STORAGE.DOSE_1, evt.target.checked);
                                handleOnSearch();
                            }} />
                            <label className="form-check-label" htmlFor="dose1">First</label>
                        </div>
                        <div className="form-check form-check-inline age-limit-chkbox">
                            <input className="form-check-input" type="checkbox" id="dose2" checked={dose2} value={dose2}
                                onChange={(evt) => {
                                    setDose2(evt.target.checked)
                                    setItem(LOCAL_STORAGE.DOSE_2, evt.target.checked);
                                    handleOnSearch();
                                }}
                            />
                            <label className="form-check-label" htmlFor="dose2">Second</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={isAutoRefresh} onChange={onHandleAutoRefresh} />
                                <label className="form-check-label" htmlFor="flexCheckChecked">Auto Refresh</label>
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12">
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id={`inputGroup-sizing-sm-s-interval`}>Interval</span>
                                <select className="form-control" aria-label="Sizing example input" aria-describedby={`inputGroup-sizing-sm-interval`} value={refreshInterval || ''}
                                    onChange={onHandleIntervalChange}
                                    disabled={!isAutoRefresh}
                                >
                                    <option>Select Interval</option>
                                    {intervalOptions.map((opt) => {
                                        return <option value={opt.value} key={`int-${opt.value}`}>{opt.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-2 col-sm-6">
                    <button className="btn btn-sm btn-primary btn-block" onClick={handleOnSearch}>Search</button>
                    {isAutoRefresh && <span><small>Auto-Refreshing in {timeLefToRefreshtMsg}</small></span>}
                </div>
            </div>

            <div className="row d-md-block d-lg-block d-sm-none d-xs-none d-none">
                {(searchConditions || []).map((srch, index) => {
                    let ctr = 0;
                    return <div className="col-md-12 slot-result-wrapper" key={`${srch.center_id}-${index}`}>
                        <h4>{srch.state_name} ({srch.district_name})
                        {srch.totalRecords > 0 && <small className='float-right record-count' >{srch.totalRecords} records</small>}
                        </h4>

                        {srch.isLoading &&
                            <div className='loader-img'>
                                {renderLoader()}
                            </div>
                        }
                        {!srch.isLoading &&
                            <table className="table table-dark table-striped table-sm table-hover table-slot-result">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fee Type</th>
                                        <th>Fees</th>
                                        <th>Vaccine</th>
                                        <th>Age Limit</th>
                                        <th>Dose 1</th>
                                        <th>Dose 2</th>
                                        <th>Date</th>
                                        <th>Address</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {(srch.availableSlots || []).length === 0 && <tr><td colSpan="10" className='no-record'>No slots found!</td></tr>}
                                    {(srch.availableSlots || []).map((slot) => {
                                        return (slot.sessions || []).map((session, indx) => {
                                            return <tr key={session.session_id}>
                                                <td>{++ctr}</td>
                                                <td>{slot.center.fee_type}</td>
                                                <td>{slot.center.vaccine_fees ? `${slot.center.vaccine_fees[0].fee} (${slot.center.vaccine_fees[0].vaccine})` : '0'}</td>
                                                <td>{session.vaccine}</td>
                                                <td>{session.min_age_limit}</td>
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
                        }
                    </div>
                })}
            </div>

            <div className="row d-lg-none d-md-none d-sm-block d-xs-block">
                {(searchConditions || []).map((srch) => {
                    return <div className="col-md-12 slot-result-wrapper" key={`${srch.center_id}-mob`}>
                        <h4>{srch.state_name} ({srch.district_name})
                        {srch.totalRecords > 0 && <small className='float-right record-count' >{srch.totalRecords} records</small>}
                        </h4>

                        {srch.isLoading &&
                            <div className='loader-img'>
                                {renderLoader()}
                            </div>
                        }

                        {!srch.isLoading && <>
                            {(srch.availableSlots || []).length === 0 && <div className='no-record'>No slots found!</div>}
                            <div className="list-group">
                                {(srch.availableSlots || []).map((slot) => {
                                    return (slot.sessions || []).map((session, indx) => {
                                        return <a href="#" onClick={(evt) => { evt.preventDefault(); return false; }} className="list-group-item list-group-item-action" aria-current="true" key={`a-${session.session_id}`}>
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="mb-1">
                                                    Age Limit: {session.min_age_limit}
                                                    {slot.center.fee_type != 'Free'
                                                        && <>
                                                            {slot.center.vaccine_fees ? `, Rs. ${slot.center.vaccine_fees[0].fee} (${slot.center.vaccine_fees[0].vaccine})` : ''}</>}
                                                </h5>
                                                <small>
                                                    <span className={`badge ${slot.center.fee_type === 'Free' ? 'bg-primary' : 'bg-info'}`}>{slot.center.fee_type}</span>
                                                </small>
                                            </div>

                                            <p className="mb-1">
                                                First Dose: <b>{session.available_capacity_dose1}</b>,{` `}
                                                Second Dose: <b>{session.available_capacity_dose2}</b>,
                                            </p>

                                            <p className='mb-2'><small>{slot.center.name}, {slot.center.address}</small></p>
                                            <p className='mb-0'>
                                                <small><span className="badge bg-secondary">{session.vaccine}</span></small>
                                                <small><span className="badge bg-secondary ml-10">{session.date}</span></small>
                                            </p>
                                        </a>
                                    })
                                })
                                }
                            </div>
                        </>}
                    </div>
                })}
            </div>
        </div>
    );
}

export default HeaderBarComponent;
