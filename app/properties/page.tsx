import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";


const ProppertiesPage = async() => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        

        return(
            <ClientOnly>
                <EmptyState 
                    title="Unauthorized" 
                    subtitle="Please login" 
                />
            </ClientOnly>




        )

    }


    const listings = await getListings({
        userId: currentUser.id,
    });


    if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you havent reserved any properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
      listings={listings} 
      currentUser={currentUser} 
      />
    </ClientOnly>
  );
}



export default ProppertiesPage;