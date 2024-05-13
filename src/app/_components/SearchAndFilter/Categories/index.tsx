import React from "react";
import Link from "next/link";
import { Config } from "../../../../pl-types";

import './categories.scss';

const Categories: React.FC<{ newCats: Config }> = ({ newCats }) => {

    const catsArray = Array.isArray(newCats) ? newCats : [];

    return (
        <React.Fragment>
            {catsArray.map((cat) => {
                const theLink = <div key={cat.id} className="categories-button mt-2">
                    <Link key={cat.id} href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/' + '?page=1' + '&category=' + cat.id} className="text-sm p-1">{cat.title}</Link>
                </div>
                const lilDash = <span className="m-2">-</span>
                return [theLink, lilDash];
            })}
            <div className="categories-button px-1 text-sm mt-2"><Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/?page=0&category=0'}>All</Link></div>
        </React.Fragment>
    )
}

export default Categories;