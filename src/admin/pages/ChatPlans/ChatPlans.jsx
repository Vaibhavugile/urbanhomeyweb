import React,{
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import TableLayout from "../../components/table/TableLayout";

import {
  getChatPlans,
} from "./ChatPlansService";

import {
  chatPlanColumns,
} from "./ChatPlansColumns";

import "./ChatPlans.css";

function ChatPlans(){

    const navigate =
        useNavigate();

    const [plans,setPlans] =
        useState([]);

    const [loading,setLoading] =
        useState(true);

    const [search,setSearch] =
        useState("");

    useEffect(()=>{

        loadPlans();

    },[]);

    async function loadPlans(){

        try{

            setLoading(true);

            const data =
                await getChatPlans();

            setPlans(data);

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    const filteredPlans =
        plans.filter((plan)=>{

            const keyword =
                search.toLowerCase();

            return(

                plan.title
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                plan.badge
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                plan.productId
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    const columns =
        chatPlanColumns({

            onEdit:(plan)=>{

                navigate(

                    `/admin/chat-plans/edit/${plan.documentId}`

                );

            },

        });

    return(

        <PageLayout

            title="Chat Plans"

            subtitle="Manage chat unlock plans."

        >

            <TableLayout

                title="Chat Plans"

                total={filteredPlans.length}

                columns={columns}

                data={filteredPlans}

                loading={loading}

                search={search}

                onSearch={setSearch}

                onRefresh={loadPlans}

                addLabel="Add Chat Plan"

                onAdd={()=>{

                    navigate(

                        "/admin/chat-plans/add"

                    );

                }}

                emptyMessage="No chat plans found."

            />

        </PageLayout>

    );

}

export default ChatPlans;