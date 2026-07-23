import React,{
  useEffect,
  useState,
} from "react";

import {
  MdPeople,
  MdHomeWork,
  MdPersonSearch,
  MdCurrencyRupee,
  MdVerifiedUser,
  MdFavorite,
  MdChat,
  MdTrendingUp,
} from "react-icons/md";

import PageLayout from "../../layout/PageLayout";

import StatCard from "../../components/cards/StatCard";

import {
  getDashboardStats,
} from "./DashboardService";

import "./Dashboard.css";

function Dashboard(){

   const [stats,setStats] =
    useState({

        totalUsers:0,

        totalListings:0,

        totalFlatmates:0,

        totalMatches:0,

        totalReports:0,

        totalPayments:0,

        verifiedUsers:0,

        pendingVerifications:0,

        totalRevenue:0,

        basicPlans:0,

        standardPlans:0,

        premiumPlans:0,

    });

    const [loading,setLoading] =
        useState(true);

    useEffect(()=>{

        loadDashboard();

    },[]);

    async function loadDashboard(){

        try{

            setLoading(true);

            const data =
                await getDashboardStats();

            setStats(data);

        }

        catch(error){

            console.error(
                "Dashboard Error:",
                error
            );

        }

        finally{

            setLoading(false);

        }

    }

    return(

        <PageLayout

            title="Dashboard"

            subtitle="Welcome back! Here's what's happening on UrbanHomey."

        >

            <div className="dashboard-grid">

                {/* ======================================================
                    KPI CARDS
                ====================================================== */}

                <div className="stats-grid">

                    <StatCard

                        title="Total Users"

                        value={stats.totalUsers}

                        subtitle="Registered Users"

                        trend="Live"

                        color="#7C3AED"

                        icon={<MdPeople />}

                    />

                    <StatCard

                        title="Flat Listings"

                        value={stats.totalListings}

                        subtitle="Active Listings"

                        trend="Live"

                        color="#2563EB"

                        icon={<MdHomeWork />}

                    />

                    <StatCard

                        title="Flatmates"

                        value={stats.totalFlatmates}

                        subtitle="Looking for Flatmates"

                        trend="Live"

                        color="#EC4899"

                        icon={<MdPersonSearch />}

                    />

                    <StatCard
    title="Revenue"
    value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
    subtitle={`${stats.totalPayments} Completed Purchases`}
    trend={`${stats.basicPlans} Basic • ${stats.standardPlans} Standard • ${stats.premiumPlans} Premium`}
    color="#16A34A"
    icon={<MdCurrencyRupee />}
/>
                    <StatCard

                        title="Verified Users"

                        value={stats.verifiedUsers}

                        subtitle="Approved Profiles"

                        trend="Live"

                        color="#22C55E"

                        icon={<MdVerifiedUser />}

                    />

                    <StatCard

                        title="Matches"

                        value={stats.totalMatches}

                        subtitle="Successful Matches"

                        trend="Live"

                        color="#F97316"

                        icon={<MdFavorite />}

                    />

                    <StatCard

                        title="Chats"

                        value="0"

                        subtitle="Unlocked Conversations"

                        trend="Coming Soon"

                        color="#0EA5E9"

                        icon={<MdChat />}

                    />

                    <StatCard

                        title="Pending Verification"

                        value={stats.pendingVerifications}

                        subtitle="Waiting for Review"

                        trend="Action Required"

                        color="#F59E0B"

                        icon={<MdTrendingUp />}

                    />

                </div>

                {/* ======================================================
                    DASHBOARD CONTENT
                ====================================================== */}

                <div className="dashboard-content">

                    <div className="dashboard-card">

                        <h2>

                            📈 User Growth

                        </h2>


                            <StatCard
    title="Plans Sold"
    value={stats.totalPayments}
    subtitle="Completed Purchases"
    trend={`${stats.basicPlans} Basic • ${stats.standardPlans} Standard • ${stats.premiumPlans} Premium`}
    color="#7C3AED"
    icon={<MdTrendingUp />}
/>

                        

                    </div>

                    <div className="dashboard-card">

                        <h2>

                            ⚡ Recent Activity

                        </h2>

                        <div className="placeholder">

                            Activity Feed Coming Soon

                        </div>

                    </div>

                </div>

            </div>

        </PageLayout>

    );

}

export default Dashboard;