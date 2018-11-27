import React from 'react';
import { Decamelize, Capitalize } from './util/stringutil';

const Summary = () => {
    
    return (
        <div>
            <span className="flow-text">Dear user here is your Questionnaire Summary:</span>

            <ul className="collection">
               
               {
                   Object.keys(localStorage).map( (storageKey, i) => {
                        let nonCamel = Decamelize( storageKey, " ");
                        return (
                            <li className="collection-item">

                                <div>
                                    {
                                        Capitalize(nonCamel)
                                    }:
                                </div>

                                <div>
                                    {
                                        (storageKey==="inssurances") ?
                                        (
                                            Capitalize(
                                                    Decamelize(JSON.parse(localStorage.getItem(storageKey))
                                                        .toString(), " ")
                                            )
                                        ) :
                                        Capitalize(localStorage.getItem(storageKey))
                                    }
                                </div>
                            </li>)
                   })
               }

            </ul>

        </div>
    );
}

export default Summary;