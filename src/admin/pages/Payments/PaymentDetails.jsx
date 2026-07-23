import React,{
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
  getPaymentById,
} from "./PaymentDetailsService";

import "./PaymentDetails.css";

function PaymentDetails(){

    const { paymentId } =
        useParams();

    const [payment,setPayment] =
        useState(null);

    const [loading,setLoading] =
        useState(true);

    useEffect(()=>{

        loadPayment();

    },[paymentId]);

    async function loadPayment(){

        setLoading(true);

        const data =
            await getPaymentById(paymentId);

        setPayment(data);

        setLoading(false);

    }

    if(loading){

        return(

            <PageLayout title="Loading">

                Loading Payment...

            </PageLayout>

        );

    }

    if(!payment){

        return(

            <PageLayout title="Payment">

                Payment Not Found

            </PageLayout>

        );

    }

    return(

        <PageLayout

            title="Payment Details"

            subtitle="Review plan purchase"

        >

            <div className="payment-page">

                {/* HERO */}

                <div className="payment-hero">

                    <div className="payment-user-image">

                        <img
                            src={
                                payment.user?.profilePhotoUrl ||
                                "https://placehold.co/300x300"
                            }
                            alt={payment.user?.name}
                        />

                    </div>

                    <div className="payment-summary">

                        <span className="payment-plan">

                            💳 {payment.planName}

                        </span>

                        <h1>

                            {payment.user?.name || "-"}

                        </h1>

                        <p className="payment-address">

                            📞 {payment.user?.phoneNumber}

                        </p>

                        <div className="payment-badges">

                            <span>

                                👤 {payment.user?.userType || "-"}

                            </span>

                            <span>

                                🏙 {payment.user?.city || "-"}

                            </span>

                            <span>

                                💼 {payment.user?.occupation || "-"}

                            </span>

                            <span>

                                {payment.user?.isVerified
                                    ? "✅ Verified"
                                    : "❌ Not Verified"}

                            </span>

                        </div>

                    </div>

                </div>

                {/* PURCHASE DETAILS */}

                <div className="details-section">

                    <div className="section-title">

                        💳 Purchase Information

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>

                                    Plan

                                </label>

                                <strong>

                                    {payment.planName}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Product ID

                                </label>

                                <strong>

                                    {payment.productId}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Purchase ID

                                </label>

                                <strong>

                                    {payment.purchaseId}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Contacts Purchased

                                </label>

                                <strong>

                                    {payment.contactsPurchased}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Status

                                </label>

                                <strong>

                                    {payment.status}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Purchase Date

                                </label>

                                <strong>

                                    {payment.purchaseDate?.toDate
                                        ? payment.purchaseDate
                                              .toDate()
                                              .toLocaleString("en-IN")
                                        : "-"}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>
{/* ==========================================================
    SUBSCRIPTION SUMMARY
========================================================== */}

<div className="details-section">

    <div className="section-title">

        📦 Subscription Summary

    </div>

    <div className="subscription-grid">

        <div className="subscription-card">

            <span className="subscription-icon">

                💳

            </span>

            <label>

                Current Plan

            </label>

            <h2>

                {payment.user?.currentPlan || "-"}

            </h2>

        </div>

        <div className="subscription-card">

            <span className="subscription-icon">

                📞

            </span>

            <label>

                Remaining Contacts

            </label>

            <h2>

                {payment.user?.remainingContacts ?? 0}

            </h2>

        </div>

        <div className="subscription-card">

            <span className="subscription-icon">

                🎁

            </span>

            <label>

                Purchased Contacts

            </label>

            <h2>

                {payment.contactsPurchased}

            </h2>

        </div>

        <div className="subscription-card">

            <span className="subscription-icon">

                ✅

            </span>

            <label>

                Payment Status

            </label>

            <h2>

                {payment.status}

            </h2>

        </div>

    </div>

</div>
            </div>

        </PageLayout>

    );

}

export default PaymentDetails;