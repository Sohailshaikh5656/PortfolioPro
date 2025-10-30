import React from 'react'
import SingleCard from './SingleCard'
export default function Card({ users }) {

    return (
        <>
            {users && Array.isArray(users) && users.map((item, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <SingleCard user={item} />
                </div>
            ))}
        </>
    )
}
