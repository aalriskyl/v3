import { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuComponent } from '@metronic/assets/ts/components';
import { ID, QUERIES } from '@metronic/helpers';
import { deleteUser } from '../../../molecules/core/_requests';
import { useQueryResponse } from '../../../molecules/core/QueryResponseProvider';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components

type Props = {
    id: ID;
};

const UomActionsCell: FC<Props> = ({ id }) => {
    const { query } = useQueryResponse();
    const queryClient = useQueryClient();

    // State to control the delete confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Mutation to delete the user
    const deleteItem = useMutation({
        mutationFn: () => deleteUser(id),
        onSuccess: () => {
            // Invalidate the query cache to refresh the table
            queryClient.invalidateQueries({
                queryKey: [`${QUERIES.USERS_LIST}-${query}`],
            });
            // Close the modal after successful deletion
            setShowDeleteModal(false);
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
            // Optionally, show an error message to the user
        },
    });

    // Reinitialize the menu component on mount
    useEffect(() => {
        MenuComponent.reinitialization();
    }, []);

    return (
        <>
            {/* Menu Trigger */}
            <a
                href="#"
                className="text-left"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
            >
                <span className="fs-2">
                    <i className="bi bi-three-dots-vertical d-flex justify-content-center" />
                </span>
            </a>

            {/* Menu */}
            <div
                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 fw-normal w-125px py-4"
                data-kt-menu="true"
            >
                {/* Delete Menu Item */}
                <div className="menu-item px-3">
                    <a
                        className="menu-link px-3 text-danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete
                    </a>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => deleteItem.mutate()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export { UomActionsCell };