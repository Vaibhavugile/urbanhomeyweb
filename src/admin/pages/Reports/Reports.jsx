import React,{
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import TableLayout from "../../components/table/TableLayout";

import {
  getReports,
} from "./ReportService";

import {
  reportColumns,
} from "./ReportColumns";

import "./Reports.css";

function Reports(){

    const navigate =
        useNavigate();

    const [reports,setReports] =
        useState([]);

    const [loading,setLoading] =
        useState(true);

    const [search,setSearch] =
        useState("");

    useEffect(()=>{

        loadReports();

    },[]);

    async function loadReports(){

        try{

            setLoading(true);

            const data =
                await getReports();

            setReports(data);

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    const filteredReports =
        reports.filter((report)=>{

            const keyword =
                search.toLowerCase();

            return(

                report.reason
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                report.description
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                report.reporter?.name
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                report.reportedUser?.name
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                report.status
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    const columns =
        reportColumns({

            onView:(report)=>{

                navigate(
                    `/admin/reports/${report.documentId}`
                );

            },

        });

    return(

        <PageLayout

            title="Reported Users"

            subtitle="Review user reports submitted by the community."

        >

            <TableLayout

                title="All Reports"

                total={filteredReports.length}

                columns={columns}

                data={filteredReports}

                loading={loading}

                search={search}

                onSearch={setSearch}

                onRefresh={loadReports}

                addLabel={null}

                emptyMessage="No reports found."

            />

        </PageLayout>

    );

}

export default Reports;