import Message from "@/components/Message";
import Notif from "@/components/Notif";
import Sidebar from "@/components/sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <Sidebar> */}
        <Notif></Notif>
        <br />
        <br />
        <Message></Message>
      {/* </Sidebar> */}
    </div>
  );
};

export default page;
