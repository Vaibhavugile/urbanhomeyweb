import React from "react";

import {
  MdWorkspacePremium,
  MdCheckCircle,
  MdCancel,
  MdStar,
  MdChat,
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

export const chatPlanColumns = ({

    onEdit,

}) => [

/* ==========================================================
   PLAN
========================================================== */

{

    key:"title",

    title:"Plan",

    render:(plan)=>(

        <div>

            <div
                style={{
                    fontWeight:700,
                    fontSize:15,
                    color:"#111827",
                }}
            >

                {plan.title}

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
                        color:"#4F46E5",
                    }}
                >

                    <MdWorkspacePremium/>

                    {plan.badge}

                </span>

            </div>

        </div>

    ),

},

/* ==========================================================
   CONTACTS
========================================================== */

{

    key:"contacts",

    title:"Chat Credits",

    render:(plan)=>(

        <span
            style={{
                ...badgeStyle,
                background:"#EFF6FF",
                color:"#2563EB",
            }}
        >

            <MdChat/>

            {plan.contacts} Chats

        </span>

    ),

},

/* ==========================================================
   PRODUCT ID
========================================================== */

{

    key:"productId",

    title:"Product ID",

    render:(plan)=>(

        <code
            style={{
                fontSize:13,
                color:"#374151",
                background:"#F8FAFC",
                padding:"8px 12px",
                borderRadius:10,
            }}
        >

            {plan.productId}

        </code>

    ),

},

/* ==========================================================
   FEATURES
========================================================== */

{

    key:"features",

    title:"Features",

    render:(plan)=>(

        <span
            style={{
                ...badgeStyle,
                background:"#F3F4F6",
                color:"#374151",
            }}
        >

            {plan.features?.length || 0} Features

        </span>

    ),

},

/* ==========================================================
   ACTIVE
========================================================== */

{

    key:"active",

    title:"Status",

    render:(plan)=>(

        plan.isActive

        ?

        <span
            style={{
                ...badgeStyle,
                background:"#DCFCE7",
                color:"#15803D",
            }}
        >

            <MdCheckCircle/>

            Active

        </span>

        :

        <span
            style={{
                ...badgeStyle,
                background:"#FEE2E2",
                color:"#B91C1C",
            }}
        >

            <MdCancel/>

            Disabled

        </span>

    ),

},

/* ==========================================================
   HIGHLIGHTED
========================================================== */

{

    key:"highlight",

    title:"Featured",

    render:(plan)=>(

        plan.isHighlighted

        ?

        <span
            style={{
                ...badgeStyle,
                background:"#FEF3C7",
                color:"#B45309",
            }}
        >

            <MdStar/>

            Featured

        </span>

        :

        "-"

    ),

},

/* ==========================================================
   SORT ORDER
========================================================== */

{

    key:"sortOrder",

    title:"Order",

},

/* ==========================================================
   ACTIONS
========================================================== */

{

    key:"actions",

    title:"Actions",

    render:(plan)=>(

        <TableActions

            row={plan}

            onEdit={onEdit}

            hideView

            hideDelete

        />

    ),

},

];