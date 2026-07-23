import React,{
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import PageLayout from "../../layout/PageLayout";

import TableLayout from "../../components/table/TableLayout";

import {
  getMatches,
} from "./MatchService";

import {
  matchColumns,
} from "./MatchColumns";

import "./Matches.css";

function Matches(){

    const navigate =
        useNavigate();

    const [matches,setMatches] =
        useState([]);

    const [loading,setLoading] =
        useState(true);

    const [search,setSearch] =
        useState("");

    useEffect(()=>{

        loadMatches();

    },[]);

    async function loadMatches(){

        try{

            setLoading(true);

            const data =
                await getMatches();

            setMatches(data);

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    const filteredMatches =
        matches.filter((match)=>{

            const keyword =
                search.toLowerCase();

            return(

                match.chatRoomId
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                match.user1_uid
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                match.user2_uid
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                match.user1_profile_type
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                match.user2_profile_type
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    const columns =
        matchColumns({

            onView:(match)=>{

                navigate(

                    `/admin/matches/${match.documentId}`

                );

            },

        });

    return(

        <PageLayout

            title="Matches"

            subtitle="Manage all user matches."

        >

            <TableLayout

                title="All Matches"

                total={filteredMatches.length}

                columns={columns}

                data={filteredMatches}

                loading={loading}

                search={search}

                onSearch={setSearch}

                onRefresh={loadMatches}

                addLabel={null}

                emptyMessage="No matches found."

            />

        </PageLayout>

    );

}

export default Matches;