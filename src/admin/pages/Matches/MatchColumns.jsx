import React from "react";

import {
  MdLockOpen,
  MdLock,
  MdCalendarToday,
  MdPerson,
  MdHome,
} from "react-icons/md";

import TableActions from "../../components/table/TableActions";

const badgeStyle = {
  padding: "8px 14px",
  borderRadius: "999px",
  fontSize: 12,
  fontWeight: 700,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const formatDate = (timestamp) => {

  if (!timestamp) return "-";

  try {

    return timestamp
      .toDate()
      .toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

  } catch {

    return "-";

  }

};

export const matchColumns = ({

  onView,

}) => [

/* ==========================================================
   CHAT ROOM
========================================================== */

{

  key:"chatRoomId",

  title:"Chat Room",

  render:(match)=>(

    <div
      style={{
        minWidth:250,
        fontWeight:600,
        color:"#374151",
        wordBreak:"break-all",
      }}
    >

      {match.chatRoomId}

    </div>

  ),

},

/* ==========================================================
   USER 1
========================================================== */

{

  key:"user1",

  title:"User 1",

  render:(match)=>(

    <div>

      <div
        style={{
          fontWeight:700,
          color:"#111827",
        }}
      >

        {match.user1_uid}

      </div>

      <div
        style={{
          marginTop:5,
        }}
      >

        <span
          style={{
            ...badgeStyle,
            background:"#EEF2FF",
            color:"#4338CA",
          }}
        >

          {

            match.user1_profile_type ===
            "flat_listing"

            ?

            <MdHome/>

            :

            <MdPerson/>

          }

          {match.user1_profile_type}

        </span>

      </div>

    </div>

  ),

},

/* ==========================================================
   USER 2
========================================================== */

{

  key:"user2",

  title:"User 2",

  render:(match)=>(

    <div>

      <div
        style={{
          fontWeight:700,
          color:"#111827",
        }}
      >

        {match.user2_uid}

      </div>

      <div
        style={{
          marginTop:5,
        }}
      >

        <span
          style={{
            ...badgeStyle,
            background:"#EEF2FF",
            color:"#4338CA",
          }}
        >

          {

            match.user2_profile_type ===
            "flat_listing"

            ?

            <MdHome/>

            :

            <MdPerson/>

          }

          {match.user2_profile_type}

        </span>

      </div>

    </div>

  ),

},

/* ==========================================================
   CONVERSATION
========================================================== */

{

  key:"conversation",

  title:"Conversation",

  render:(match)=>{

    const unlocked =
      match.conversationUnlocked;

    return(

      <span
        style={{
          ...badgeStyle,

          background:
            unlocked
            ? "#DCFCE7"
            : "#FEE2E2",

          color:
            unlocked
            ? "#15803D"
            : "#B91C1C",

        }}
      >

        {

          unlocked

          ?

          <MdLockOpen/>

          :

          <MdLock/>

        }

        {

          unlocked

          ?

          "Unlocked"

          :

          "Locked"

        }

      </span>

    );

  },

},

/* ==========================================================
   CREATED
========================================================== */

{

  key:"createdAt",

  title:"Matched",

  render:(match)=>(

    <span
      style={{
        display:"inline-flex",
        alignItems:"center",
        gap:6,
      }}
    >

      <MdCalendarToday/>

      {formatDate(match.createdAt)}

    </span>

  ),

},

/* ==========================================================
   ACTIONS
========================================================== */

{

  key:"actions",

  title:"Actions",

  render:(match)=>(

    <TableActions

      row={match}

      onView={onView}

    />

  ),

},

];