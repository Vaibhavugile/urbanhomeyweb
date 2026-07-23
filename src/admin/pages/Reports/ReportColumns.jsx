import React from "react";

import {
  MdReportProblem,
  MdHourglassTop,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";

import TableActions from "../../components/table/TableActions";

const badgeStyle = {
  padding: "8px 16px",
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
      .toLocaleDateString("en-IN", {

        day: "2-digit",
        month: "short",
        year: "numeric",

      });

  } catch {

    return "-";

  }

};

export const reportColumns = ({

  onView,

}) => [

/* =====================================================
   REPORTER
===================================================== */

{

    key:"reporter",

    title:"Reported By",

    render:(report)=>(

        <div
            style={{
                display:"flex",
                alignItems:"center",
                gap:14,
                minWidth:250,
            }}
        >

            <img
                src={
                    report.reporter?.profilePhotoUrl ||
                    "https://placehold.co/70x70"
                }
                alt=""
                style={{
                    width:60,
                    height:60,
                    borderRadius:18,
                    objectFit:"cover",
                    border:"2px solid #E5E7EB",
                }}
            />

            <div>

                <div
                    style={{
                        fontWeight:700,
                        fontSize:15,
                    }}
                >
                    {report.reporter?.name || "-"}
                </div>

                <div
                    style={{
                        color:"#6B7280",
                        fontSize:13,
                    }}
                >
                    {report.reporter?.phoneNumber || "-"}
                </div>

            </div>

        </div>

    ),

},

/* =====================================================
   REPORTED USER
===================================================== */

{

    key:"reportedUser",

    title:"Reported User",

    render:(report)=>(

        <div
            style={{
                display:"flex",
                alignItems:"center",
                gap:14,
                minWidth:250,
            }}
        >

            <img
                src={
                    report.reportedUser?.profilePhotoUrl ||
                    "https://placehold.co/70x70"
                }
                alt=""
                style={{
                    width:60,
                    height:60,
                    borderRadius:18,
                    objectFit:"cover",
                    border:"2px solid #E5E7EB",
                }}
            />

            <div>

                <div
                    style={{
                        fontWeight:700,
                        fontSize:15,
                    }}
                >
                    {report.reportedUser?.name || "-"}
                </div>

                <div
                    style={{
                        color:"#6B7280",
                        fontSize:13,
                    }}
                >
                    {report.reportedUser?.phoneNumber || "-"}
                </div>

            </div>

        </div>

    ),

},

/* =====================================================
   REASON
===================================================== */

{

    key:"reason",

    title:"Reason",

    render:(report)=>(

        <span
            style={{
                ...badgeStyle,
                background:"#FEF3C7",
                color:"#B45309",
            }}
        >

            <MdReportProblem/>

            {report.reason}

        </span>

    ),

},

/* =====================================================
   DESCRIPTION
===================================================== */

{

    key:"description",

    title:"Description",

    render:(report)=>(

        <span>

            {report.description
                ? report.description.length > 45
                    ? report.description.substring(0,45)+"..."
                    : report.description
                : "-"}

        </span>

    ),

},

/* =====================================================
   STATUS
===================================================== */

{

    key:"status",

    title:"Status",

    render:(report)=>{

        let background="#E5E7EB";

        let color="#374151";

        let text="Pending";

        let Icon=MdHourglassTop;

        switch(report.status){

            case "resolved":

                background="#DCFCE7";

                color="#15803D";

                text="Resolved";

                Icon=MdCheckCircle;

                break;

            case "rejected":

                background="#FEE2E2";

                color="#B91C1C";

                text="Rejected";

                Icon=MdCancel;

                break;

            case "reviewing":

                background="#DBEAFE";

                color="#1D4ED8";

                text="Reviewing";

                Icon=MdHourglassTop;

                break;

            default:

                background="#FEF3C7";

                color="#B45309";

                text="Pending";

        }

        return(

            <span
                style={{
                    ...badgeStyle,
                    background,
                    color,
                }}
            >

                <Icon/>

                {text}

            </span>

        );

    },

},

/* =====================================================
   DATE
===================================================== */

{

    key:"createdAt",

    title:"Reported",

    render:(report)=>

        formatDate(report.createdAt),

},

/* =====================================================
   ACTIONS
===================================================== */

{

    key:"actions",

    title:"Actions",

    render:(report)=>(

        <TableActions

            row={report}

            onView={onView}

        />

    ),

},

];