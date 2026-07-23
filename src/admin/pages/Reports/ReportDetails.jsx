import React,{
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
  getReportDetails,
  updateReportStatus,
} from "./ReportDetailsService";

import "./ReportDetails.css";

function ReportDetails(){

    const { reportId } =
        useParams();

    const [report,setReport] =
        useState(null);

    const [loading,setLoading] =
        useState(true);

    useEffect(()=>{

        loadReport();

    },[reportId]);

    async function loadReport(){

        setLoading(true);

        const data =
            await getReportDetails(reportId);

        setReport(data);

        setLoading(false);

    }

    async function resolveReport(){

        if(
            !window.confirm(
                "Mark this report as resolved?"
            )
        ) return;

        await updateReportStatus(
            report.documentId,
            "resolved"
        );

        loadReport();

    }

    async function rejectReport(){

        if(
            !window.confirm(
                "Reject this report?"
            )
        ) return;

        await updateReportStatus(
            report.documentId,
            "rejected"
        );

        loadReport();

    }

    if(loading){

        return(

            <PageLayout title="Loading">

                Loading Report...

            </PageLayout>

        );

    }

    if(!report){

        return(

            <PageLayout title="Report">

                Report Not Found

            </PageLayout>

        );

    }

    return(

        <PageLayout

            title="Report Details"

            subtitle="Review user reported complaint"

        >

            <div className="report-page">

                {/* HERO */}

                <div className="report-hero">

                    <div className="report-user-image">

                        <img

                            src={
                                report.reportedUser
                                    ?.profilePhotoUrl ||
                                "https://placehold.co/300x300"
                            }

                            alt=""

                        />

                    </div>

                    <div className="report-summary">

                        <span className="report-reason">

                            🚨 {report.reason}

                        </span>

                        <h1>

                            {report.reportedUser?.name}

                        </h1>

                        <p className="report-description">

                            {report.description}

                        </p>

                        <div className="report-badges">

                            <span>

                                👤 {report.reportedUser?.userType}

                            </span>

                            <span>

                                📞 {report.reportedUser?.phoneNumber}

                            </span>

                            <span>

                                📍 {report.reportedUser?.city}

                            </span>

                            <span>

                                {report.status}

                            </span>

                        </div>

                    </div>

                </div>

                {/* REPORTER */}

                <div className="details-section">

                    <div className="section-title">

                        🙋 Reporter Information

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>Name</label>

                                <strong>

                                    {report.reporter?.name}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>Phone</label>

                                <strong>

                                    {report.reporter?.phoneNumber}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>City</label>

                                <strong>

                                    {report.reporter?.city}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>User Type</label>

                                <strong>

                                    {report.reporter?.userType}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

                {/* REPORTED USER */}

                <div className="details-section">

                    <div className="section-title">

                        🚨 Reported User

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>Name</label>

                                <strong>

                                    {report.reportedUser?.name}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>Phone</label>

                                <strong>

                                    {report.reportedUser?.phoneNumber}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>Occupation</label>

                                <strong>

                                    {report.reportedUser?.occupation}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>Verified</label>

                                <strong>

                                    {report.reportedUser?.isVerified
                                        ? "Yes"
                                        : "No"}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

                {/* REPORT DETAILS */}

                <div className="details-section">

                    <div className="section-title">

                        📝 Complaint

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>

                                    Reason

                                </label>

                                <strong>

                                    {report.reason}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Status

                                </label>

                                <strong>

                                    {report.status}

                                </strong>

                            </div>

                            <div
                                className="property-item"
                                style={{
                                    gridColumn:
                                        "1/-1",
                                }}
                            >

                                <label>

                                    Description

                                </label>

                                <strong>

                                    {report.description}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ACTIONS */}

                <div className="details-section">

                    <div className="section-title">

                        🛠 Admin Actions

                    </div>

                    <div className="verification-action-cards">

                        <div className="verification-action-card approve">

                            <div className="action-icon">

                                ✅

                            </div>

                            <h3>

                                Resolve Report

                            </h3>

                            <p>

                                Mark this complaint as resolved.

                            </p>

                            <button
                                className="action-btn approve-btn"
                                onClick={resolveReport}
                            >

                                Resolve

                            </button>

                        </div>

                        <div className="verification-action-card reject">

                            <div className="action-icon">

                                ❌

                            </div>

                            <h3>

                                Reject Report

                            </h3>

                            <p>

                                Close this report as invalid.

                            </p>

                            <button
                                className="action-btn reject-btn"
                                onClick={rejectReport}
                            >

                                Reject

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </PageLayout>

    );

}

export default ReportDetails;