import React,{
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import {
  getMatchDetails,
} from "./MatchDetailsService";

import "./MatchDetails.css";

function MatchDetails(){

    const { matchId } =
        useParams();

    const [match,setMatch] =
        useState(null);

    const [loading,setLoading] =
        useState(true);

    useEffect(()=>{

        loadMatch();

    },[matchId]);

    async function loadMatch(){

        setLoading(true);

        const data =
            await getMatchDetails(matchId);

        setMatch(data);

        setLoading(false);

    }

    if(loading){

        return(

            <PageLayout title="Loading">

                Loading Match...

            </PageLayout>

        );

    }

    if(!match){

        return(

            <PageLayout title="Match">

                Match Not Found

            </PageLayout>

        );

    }

    return(

        <PageLayout

            title="Match Details"

            subtitle="Review match information"

        >

            <div className="match-page">

                {/* ======================================================
                    HERO
                ====================================================== */}

                <div className="match-hero">

                    <div className="match-icon">

                        ❤️

                    </div>

                    <div className="match-summary">

                        <span className="match-status">

                            {

                                match.conversationUnlocked

                                ?

                                "🔓 Conversation Unlocked"

                                :

                                "🔒 Conversation Locked"

                            }

                        </span>

                        <h1>

                            Match Overview

                        </h1>

                        <p>

                            {match.chatRoomId}

                        </p>

                        <div className="match-badges">

                            <span>

                                👤 {match.user1_profile_type}

                            </span>

                            <span>

                                👤 {match.user2_profile_type}

                            </span>

                            <span>

                                📅

                                {

                                    match.createdAt?.toDate

                                    ?

                                    match.createdAt
                                        .toDate()
                                        .toLocaleDateString("en-IN")

                                    :

                                    "-"

                                }

                            </span>

                        </div>

                    </div>

                </div>

                {/* ======================================================
                    MATCH INFORMATION
                ====================================================== */}

                <div className="details-section">

                    <div className="section-title">

                        ❤️ Match Information

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>

                                    Chat Room

                                </label>

                                <strong>

                                    {match.chatRoomId}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Conversation

                                </label>

                                <strong>

                                    {

                                        match.conversationUnlocked

                                        ?

                                        "Unlocked"

                                        :

                                        "Locked"

                                    }

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Match Created

                                </label>

                                <strong>

                                    {

                                        match.createdAt?.toDate

                                        ?

                                        match.createdAt
                                            .toDate()
                                            .toLocaleString("en-IN")

                                        :

                                        "-"

                                    }

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Unlocked At

                                </label>

                                <strong>

                                    {

                                        match.unlockedAt?.toDate

                                        ?

                                        match.unlockedAt
                                            .toDate()
                                            .toLocaleString("en-IN")

                                        :

                                        "-"

                                    }

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ======================================================
                    USER 1
                ====================================================== */}

                <div className="details-section">

                    <div className="section-title">

                        👤 User 1

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>

                                    UID

                                </label>

                                <strong>

                                    {match.user1_uid}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Profile ID

                                </label>

                                <strong>

                                    {match.user1_profile_id}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Profile Type

                                </label>

                                <strong>

                                    {match.user1_profile_type}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ======================================================
                    USER 2
                ====================================================== */}

                <div className="details-section">

                    <div className="section-title">

                        👤 User 2

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>

                                    UID

                                </label>

                                <strong>

                                    {match.user2_uid}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Profile ID

                                </label>

                                <strong>

                                    {match.user2_profile_id}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Profile Type

                                </label>

                                <strong>

                                    {match.user2_profile_type}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ======================================================
                    UNLOCK INFORMATION
                ====================================================== */}

                <div className="details-section">

                    <div className="section-title">

                        🔓 Unlock Information

                    </div>

                    <div className="details-card">

                        <div className="property-grid">

                            <div className="property-item">

                                <label>

                                    Unlocked By UID

                                </label>

                                <strong>

                                    {match.unlockedByUid}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Profile ID

                                </label>

                                <strong>

                                    {match.unlockedByProfileId}

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Unlock Time

                                </label>

                                <strong>

                                    {

                                        match.unlockedAt?.toDate

                                        ?

                                        match.unlockedAt
                                            .toDate()
                                            .toLocaleString("en-IN")

                                        :

                                        "-"

                                    }

                                </strong>

                            </div>

                            <div className="property-item">

                                <label>

                                    Status

                                </label>

                                <strong>

                                    {

                                        match.conversationUnlocked

                                        ?

                                        "Unlocked"

                                        :

                                        "Locked"

                                    }

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </PageLayout>

    );

}

export default MatchDetails;