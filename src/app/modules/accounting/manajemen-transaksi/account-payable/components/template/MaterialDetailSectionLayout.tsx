import { KTCard } from "@metronic/helpers";
import { MaterialSectionListHeader } from "../molecules/header/MaterialSectionListHeader";
import { MaterialDetailTableSection } from "./section/MaterialDetailSection";
import { MaterialProviderAp } from "../../core/MaterialAccountPayableContext";


const MaterialDetailSectionLayout = ({
  status,
  preOrderId,
}: {
  status: string | undefined;
  preOrderId?: string;
}) => {
  return (
    <MaterialProviderAp id={preOrderId}>
      <div>
        <KTCard>
          <MaterialSectionListHeader />
          <MaterialDetailTableSection preOrderId={preOrderId} />
        </KTCard>
      </div>
      </MaterialProviderAp>

     
  );
};

export default MaterialDetailSectionLayout;

