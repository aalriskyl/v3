import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import InputField from '@metronic/layout/components/form/molecules/InputField';
import SelectField from '@metronic/layout/components/form/molecules/SelectField';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { getAllServiceSupplierBySupplierID, getSelectAllService } from '../../../../../../procurement/pengajuan/purchase-order/core/_request';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';
import TextareaField from '@metronic/layout/components/form/molecules/TextareaField';

interface MaterialFormData {
    service_id: string;
    amount: number;
    remarks?: string;
    price: number;
}

interface AddMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    onSubmit: (data: any) => void;
    supplier_id: string;
    material_request_id?: string; 
    onSuccess?: () => void;
}

export const AddMaterialModal = ({ show, handleClose, onSubmit, supplier_id, material_request_id, onSuccess }: AddMaterialModalProps) => {
    const [serviceOptions, setServiceOptions] = useState<{
        value: string;
        label: string;
        price: any;
        service_suppliers: { id: string }[];
    }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
    const [failedMessage, setFailedMessage] = useState<string | null>(null)


    const { control, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<MaterialFormData>({
        defaultValues: {
            service_id: '',
            amount: 0,
            remarks: '',
            price: 0,
        }
    });

    const selectedServiceId = watch('service_id');

    // Fetch materials based on supplier ID
    useEffect(() => {
        const fetchServices = async () => {
            if (!supplier_id) return;
            try {
                const response = await getSelectAllService();
                console.log(response)
                setServiceOptions(
                    response.data.services.map((s: any) => ({
                        value: s.id, 
                        label: s.name, 
                        price: s.sell_price,
                    }))
                );
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };
        fetchServices();
    }, [supplier_id]);

    useEffect(() => {
        if (selectedServiceId) {
            const selectedService = serviceOptions.find(option => option.value === selectedServiceId);
            if (selectedService) {
                setValue('price', selectedService.price); // Set the price based on the selected service
            }
        }
    }, [selectedServiceId, serviceOptions, setValue]);

    const handleFormSubmit = async (data: MaterialFormData) => {
        setIsLoading(true);
        try {
            const payload = {
                service_id: data.service_id,
                amount: Number(data.amount),
                price: Number(data.price),
                remarks: (data.remarks)
            };
          

            const response = await axiosInstance.post(
                `/crm/submission/quotation/quotation-service/${material_request_id}`,
                payload
            );
            onSubmit(payload); // Call the onSubmit function (refetchData)
            reset();
            handleClose();
        } catch (error: any) {
              setFailedMessage(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmitAndCreateNew = async (data: MaterialFormData) => {
        setIsLoading(true);
        try {
            const payload = {
                service_id: data.service_id,
                amount: Number(data.amount),
                price: Number(data.price),
                remarks: (data.remarks)
            };
            const response = await axiosInstance.post(
                `/crm/submission/quotation/quotation-service/${material_request_id}`,
                payload
            );
            onSubmit(payload); 
            setSuccessMessage("Berhasil ditambahkan!"); 
            reset(); 
            if (onSuccess) onSuccess(); 

            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error: any) {
            setFailedMessage(getErrorMessage(error));
        }
            finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Layanan</h2>
            </Modal.Header>
            <Modal.Body>
                {failedMessage && (
                    <div className="alert alert-danger" role="alert">
                        {failedMessage}
                    </div>
                )}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div className="mb-6">
                    <Row>
                        <Col md={6}>
                            <Controller
                                name="service_id"
                                control={control}
                                rules={{ required: 'Layanan wajib dipilih' }}
                                render={({ field }) => (
                                    <SelectField
                                        label="Pilih Layanan"
                                        options={serviceOptions}
                                        placeholder="Pilih layanan"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                                name="price"
                                control={control}
                                rules={{
                                    required: "Harga wajib diisi",
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Hanya angka yang diperbolehkan",
                                    },
                                }}
                                render={({ field }) => (
                                    <InputField
                                        label="Harga"
                                        type="number"
                                        placeholder="Masukkan jumlah"
                                        control={control}
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                        <Col md={6}>
                            <Controller
                              name="amount"
                              control={control}
                              rules={{
                                required: "Jumlah wajib diisi",
                                pattern: {
                                  value: /^[0-9]*$/,
                                  message: "Hanya angka yang diperbolehkan",
                                },
                              }}
                              render={({ field }) => (
                                <InputField
                                  label="Jumlah"
                                  type="number"
                                  placeholder="Masukkan jumlah"
                                  control={control}
                                  errors={errors}
                                  {...field}
                                />
                              )}
                            />
                            </Col>
                        <Col md={6}>
                            <Controller
                                name="remarks"
                                control={control}
                                rules={{
                                }}
                                render={({ field }) => (
                                    <TextareaField
                                        label="Catatan"
                                        control={control}
                                        placeholder="Masukkan catatan"
                                        errors={errors}
                                        {...field}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                </div>
        

                {/* Buttons */}
                <div className="d-flex mt-4 g-4 justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>
                        Batalkan
                    </Button>
                    <div className="d-flex gap-4">
                        <button
                            type="button"
                            className="btn border border-primary px-8 py-2 text-primary"
                            onClick={handleSubmit(handleFormSubmitAndCreateNew)}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Menyimpan...' : 'Simpan & Tambah Baru'}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary border border-primary px-16 py-2"
                            onClick={handleSubmit(handleFormSubmit)}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};