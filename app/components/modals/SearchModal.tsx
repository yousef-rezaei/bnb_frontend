'use client';

import Modal from "./Modal";
import {useState} from "react";
import DatePicker from "../forms/Calender";
import {Range} from "react-date-range";
import CustomButton from "../forms/CustomButton";
import useSearchModal from "@/app/hooks/useSearchModal";
import SelectCountry,{SelectCountryValue} from "../forms/SelectCountry";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [country, setCountry] = useState<SelectCountryValue>();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    //
    // Set data range

    const _setDateRange =  (selection: Range) => {
        if(searchModal.step === 'checkin') {
           searchModal.open('checkout');
        } else if(searchModal.step === 'checkout') {
            searchModal.open('details');
        }
        setDateRange(selection);
    }

    //
    //Contents
    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

            <SelectCountry
                value = {country}
                onChange = {(value) => {setCountry(value as SelectCountryValue)}}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label = "Check in date ->"
                    onClick = {() => searchModal.open('checkin')}
                />
            </div>

        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

            <DatePicker 
                value= {dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label = "<- Location"
                    onClick = {() => searchModal.open('location')}
                />
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label = "Check Out date ->"
                    onClick = {() => searchModal.open('checkout')}
                />
            </div>

        </>
    );


    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check out?</h2>

            <DatePicker 
                value= {dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label = "<- Check in date"
                    onClick = {() => searchModal.open('checkin')}
                />
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label = "Details ->"
                    onClick = {() => searchModal.open('details')}
                />
            </div>

        </>
    );
    

    if(searchModal.step === 'location') {
        content = contentLocation;
    } else if(searchModal.step === 'checkin') {
        content = contentCheckin;
    } else if(searchModal.step === 'checkout') {
        content = contentCheckout;
    }
    

    return (
        <Modal
            label="Search"
            content ={content}
            close = {searchModal.close}
            isOpen={searchModal.isOpen}
        />
    );
}
export default SearchModal;