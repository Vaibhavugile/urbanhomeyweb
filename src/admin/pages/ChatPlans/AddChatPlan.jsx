import React,{
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {

  getChatPlan,

  saveChatPlan,

} from "./AddChatPlanService";

import "./AddChatPlan.css";

function AddChatPlan(){

    const { planId } =
        useParams();

    const isEdit =
        !!planId;

    const [form,setForm] =
        useState({

            title:"",

            badge:"",

            contacts:0,

            productId:"",

            sortOrder:1,

            isActive:true,

            isHighlighted:false,

            features:[

                ""

            ],

        });

    const [loading,setLoading] =
        useState(false);

    useEffect(()=>{

        if(isEdit){

            loadPlan();

        }

    },[planId]);

    async function loadPlan(){

        const data =
            await getChatPlan(planId);

        if(data){

            setForm({

                ...data,

                features:

                    data.features?.length

                    ?

                    data.features

                    :

                    [""],

            });

        }

    }

    function updateField(

        key,

        value

    ){

        setForm(

            prev=>({

                ...prev,

                [key]:value,

            })

        );

    }

    function updateFeature(

        index,

        value

    ){

        const list =
            [...form.features];

        list[index]=value;

        updateField(

            "features",

            list

        );

    }

    function addFeature(){

        updateField(

            "features",

            [

                ...form.features,

                ""

            ]

        );

    }

    function removeFeature(index){

        updateField(

            "features",

            form.features.filter(

                (_,i)=>

                    i!==index

            )

        );

    }

    async function handleSubmit(e){

        e.preventDefault();

        setLoading(true);

        await saveChatPlan(

            planId,

            form,

            isEdit

        );

        setLoading(false);

        alert(

            isEdit

            ?

            "Plan Updated"

            :

            "Plan Added"

        );

    }

    return(

        <PageLayout

            title={

                isEdit

                ?

                "Edit Chat Plan"

                :

                "Add Chat Plan"

            }

        >

            <form

                className="plan-form"

                onSubmit={handleSubmit}

            >

                {/* BASIC */}

                <div className="form-card">

                    <h2>

                        Plan Information

                    </h2>

                    <div className="form-grid">

                        <input

                            placeholder="Title"

                            value={form.title}

                            onChange={(e)=>

                                updateField(

                                    "title",

                                    e.target.value

                                )

                            }

                        />

                        <input

                            placeholder="Badge"

                            value={form.badge}

                            onChange={(e)=>

                                updateField(

                                    "badge",

                                    e.target.value

                                )

                            }

                        />

                        <input

                            type="number"

                            placeholder="Contacts"

                            value={form.contacts}

                            onChange={(e)=>

                                updateField(

                                    "contacts",

                                    Number(

                                        e.target.value

                                    )

                                )

                            }

                        />

                        <input

                            placeholder="Product ID"

                            value={form.productId}

                            onChange={(e)=>

                                updateField(

                                    "productId",

                                    e.target.value

                                )

                            }

                        />

                        <input

                            type="number"

                            placeholder="Sort Order"

                            value={form.sortOrder}

                            onChange={(e)=>

                                updateField(

                                    "sortOrder",

                                    Number(

                                        e.target.value

                                    )

                                )

                            }

                        />

                    </div>

                </div>

                {/* FEATURES */}

                <div className="form-card">

                    <h2>

                        Features

                    </h2>

                    {

                        form.features.map(

                            (

                                feature,

                                index

                            )=>(

                                <div

                                    key={index}

                                    className="feature-row"

                                >

                                    <input

                                        value={feature}

                                        placeholder="Feature"

                                        onChange={(e)=>

                                            updateFeature(

                                                index,

                                                e.target.value

                                            )

                                        }

                                    />

                                    <button

                                        type="button"

                                        onClick={()=>

                                            removeFeature(index)

                                        }

                                    >

                                        Remove

                                    </button>

                                </div>

                            )

                        )

                    }

                    <button

                        type="button"

                        onClick={addFeature}

                    >

                        + Add Feature

                    </button>

                </div>

                {/* SETTINGS */}

                <div className="form-card">

                    <h2>

                        Settings

                    </h2>

                    <label>

                        <input

                            type="checkbox"

                            checked={form.isActive}

                            onChange={(e)=>

                                updateField(

                                    "isActive",

                                    e.target.checked

                                )

                            }

                        />

                        Active

                    </label>

                    <label>

                        <input

                            type="checkbox"

                            checked={form.isHighlighted}

                            onChange={(e)=>

                                updateField(

                                    "isHighlighted",

                                    e.target.checked

                                )

                            }

                        />

                        Highlighted

                    </label>

                </div>

                <button

                    className="save-btn"

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Saving..."

                        :

                        isEdit

                        ?

                        "Update Plan"

                        :

                        "Create Plan"

                    }

                </button>

            </form>

        </PageLayout>

    );

}

export default AddChatPlan;