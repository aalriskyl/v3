/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { KTCard } from "@metronic/helpers";
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { MaterialSectionListHeader } from "../molecules/header/MaterialSectionListHeader";
import { MaterialTableSection } from "./section/MaterialSection";
import axiosInstance from "../../../../../../../service/axiosInstance";

const MaterialSectionLayout = ({ materialChoice, setMaterialChoice }: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // useEffect(()=>{
  //     axiosInstance.
  // },[])

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update search term
  };

  return (
    <div>
      <KTCard>
        <MaterialSectionListHeader />
        <MaterialTableSection
          materialChoice={materialChoice}
          setMaterialChoice={setMaterialChoice}
        />
      </KTCard>
    </div>
  );
};

export default MaterialSectionLayout;
