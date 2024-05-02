import React from "react";
import Link from "next/link";

import './categories.scss';

const Categories: React.FC<{ newCats: string[] }> = ({ newCats }) => {

    return (
        <React.Fragment>
            {newCats.map((cat: any) => {
                const theLink = <div key={cat.id} className="categories-button"><Link key={cat.id} href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/' + '?page=1' + '&category=' + cat.id}>{cat.title}</Link></div>
                return theLink;
            })}
            <div className="categories-button"><Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/?page=0&category=0'}>All</Link></div>
        </React.Fragment>
    )
}

export default Categories;