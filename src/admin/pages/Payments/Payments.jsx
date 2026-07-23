import React,{
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import TableLayout from "../../components/table/TableLayout";

import {
  getPayments,
} from "./PaymentsService";

import {
  paymentColumns,
} from "./PaymentColumns";

import "./Payments.css";

function Payments(){

    const navigate =
        useNavigate();

    const [payments,setPayments] =
        useState([]);

    const [loading,setLoading] =
        useState(true);

    const [search,setSearch] =
        useState("");

    useEffect(()=>{

        loadPayments();

    },[]);

    async function loadPayments(){

        try{

            setLoading(true);

            const data =
                await getPayments();

            setPayments(data);

        }

        finally{

            setLoading(false);

        }

    }

    const filteredPayments =
        payments.filter((payment)=>{

            const keyword =
                search.toLowerCase();

            return(

                payment.planName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                payment.purchaseId
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                payment.userName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                payment.userPhone
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    const columns =
        paymentColumns({

            onView:(payment)=>{

                navigate(
                    `/admin/payments/${payment.documentId}`
                );

            },

        });

    return(

        <PageLayout

            title="Payments"

            subtitle="Manage all plan purchases."

        >

            <TableLayout

                title="All Payments"

                total={filteredPayments.length}

                columns={columns}

                data={filteredPayments}

                loading={loading}

                search={search}

                onSearch={setSearch}

                onRefresh={loadPayments}

                addLabel={null}

                emptyMessage="No payments found."

            />

        </PageLayout>

    );

}

export default Payments;