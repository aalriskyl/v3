import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuComponent } from "@metronic/assets/ts/components";
import { ID, QUERIES } from "@metronic/helpers";
import { useListView } from "../../../molecules/core/ListViewProvider";
import { useQueryResponse } from "../../../molecules/core/QueryResponseProvider";
import { deleteUser } from "../../../molecules/core/_requests";
import { DetailMaterialModal } from "../../../molecules/modals/DetailMaterialModal";
type Props = {
  id: ID;
};

const MaterialActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate } = useListView();
  const { query } = useQueryResponse();
  const queryClient = useQueryClient();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const deleteItem = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${QUERIES.USERS_LIST}-${query}`],
      });
    },
  });

  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // Ensure id is always a string
  const materialId = id ? id.toString() : "";

  return (
    <>
      <a
        className="fs-7 text-success"
        onClick={id ? handleOpenDetailModal : undefined}
        style={{ cursor: id ? "pointer" : "not-allowed" }}
      >
        Detail
      </a>

      {/* Detail Modal */}
      {isDetailModalOpen && (
        <DetailMaterialModal
          show={isDetailModalOpen}
          handleClose={handleCloseDetailModal}
          id={materialId} // Pass the id prop
        />
      )}
    </>
  );
};

export { MaterialActionsCell };
