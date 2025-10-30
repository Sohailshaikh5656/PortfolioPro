import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import DarkTemplate from '../template/DarkTemplate';
import LightTemplate from '../template/LightTrmplate';
export default function UserSection() {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = process.env.REACT_APP_BACKEND_URL + "/user/" + id
                let response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Accept': 'application/json',
                    },
                })
                response = await response.json()
                if (response.code == 1) {
                    setPortfolio(response.data)
                }
            } catch (err) {
                console.error("Error : ", err)
                return;
            }
        }

        fetchData()
    }, [])
    return (
        // In your main component
        <>
            {!portfolio ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading portfolio data...</p>
                </div>
            ) : portfolio?.user?.[0]?.template_id === 1 ? (
                <LightTemplate portfolioData={portfolio} />
            ) : (
                <DarkTemplate portfolioData={portfolio} />
            )}
        </>
    )
}
