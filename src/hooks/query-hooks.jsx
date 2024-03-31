import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";


function Authenticate() {

    const auth_user = useQuery({
        queryKey: ["auth"],
        queryFn: ()=>{
          return axios.get('http://127.0.0.1:8000/sales/payment/')
        }
      });


}


