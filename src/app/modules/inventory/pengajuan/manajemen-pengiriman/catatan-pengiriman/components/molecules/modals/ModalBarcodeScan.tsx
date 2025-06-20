/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "@metronic/layout/components/form/molecules/InputField";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../../../../../../../../service/axiosInstance";
import { log } from "console";

export const ModalBarcodeScan = ({
    show,
    handleClose,
    datamaterial,
    setMaterial
}: any) => {
    const { control, setValue, watch } = useForm<any>({
        defaultValues: {
            barcode: '',
            materialName: '',
            amount: 0,
        }
    });

    const [mode, setMode] = useState<'scan' | 'manual'>('scan'); // State untuk mode input

    // Gunakan ref untuk menyimpan nilai terbaru
    const datamaterialRef = useRef(datamaterial);
    const setMaterialRef = useRef(setMaterial);

    // Update ref saat props berubah
    useEffect(() => {
        datamaterialRef.current = datamaterial;
        setMaterialRef.current = setMaterial;
    }, [datamaterial, setMaterial]);

    const searchMaterialBarcode = (value: string) => {
        const currentMaterials = datamaterialRef.current;
        const currentSetMaterial = setMaterialRef.current;

        const foundMaterialIndex = currentMaterials.findIndex(
            (item: any) => item.material_uom.barcode == value
        );


        
        if (foundMaterialIndex !== -1) {
            const foundMaterial = currentMaterials[foundMaterialIndex];
            const updatedMaterials = currentMaterials.map((item: any, index: any) => {
                if (index === foundMaterialIndex) {
                    return {
                        ...item,
                        amount: item.amount + 1
                    };
                }
                return item;
            });

            console.log("Updated Materials", foundMaterial);

            axiosInstance.put(`/inventory/submission/delivery-management/delivery-note/delivery-note-material/${foundMaterial.id}`, {
                "amount": foundMaterial.amount + 1
            })
            
            // Set nilai materialName dan amount secara otomatis
            setValue("materialName", foundMaterial.material.name);
            setValue("amount", foundMaterial.amount + 1);

            currentSetMaterial(updatedMaterials);
        } else {
            console.log("Barcode not found in materials");
            // Reset nilai jika barcode tidak ditemukan
            setValue("materialName", "");
            setValue("amount", 0);
        }
    };

    // Handle input manual (ketik)
    const handleManualInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const barcode = e.currentTarget.value; // Ambil nilai dari input field
            if (barcode) {
                setValue("barcode", barcode);
                searchMaterialBarcode(barcode);
            }
        }
    };

    // Handle button click untuk mode manual
    const handleManualButtonClick = () => {
        const barcode = watch("barcode"); // Ambil nilai barcode dari form
        if (barcode) {
            searchMaterialBarcode(barcode);
        }
    };

    // Handle input scan
    useEffect(() => {
        if (mode === 'scan') {
            let input = '';
            let timeout: NodeJS.Timeout;

            const handleKeyPress = (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    const barcode = input;
                    setValue("barcode", barcode);
                    input = '';
                    searchMaterialBarcode(barcode);
                } else {
                    input += e.key;
                    console.log(input)
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        const barcode = input;
                        setValue("barcode", barcode);
                        input = '';
                        searchMaterialBarcode(barcode);
                    }, 200);
                }
            };

            window.addEventListener('keypress', handleKeyPress);
            return () => {
                window.removeEventListener('keypress', handleKeyPress);
                clearTimeout(timeout);
            };
        }
    }, [setValue, mode]);

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>Scan Barcode</h2>
            </Modal.Header>

            <Modal.Body>
                {/* Switch Toggle untuk Mode */}
                <div className="mb-3 d-flex align-items-center">
                    <span className="me-2">Mode Scan</span>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="modeToggle"
                            checked={mode === 'manual'}
                            onChange={(e) => setMode(e.target.checked ? 'manual' : 'scan')}
                        />
                        <label className="form-check-label" htmlFor="modeToggle">
                            Mode Ketik
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <Controller
                        name="barcode"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label="Barcode"
                                type="text" // Ubah ke type text agar bisa input manual
                                placeholder={mode === 'scan' ? "Scan barcode" : "Masukkan barcode secara manual"}
                                control={control}
                                {...field}
                                onKeyPress={mode === 'manual' ? handleManualInput : undefined} // Gunakan onKeyPress untuk mode manual
                                disabled={mode === 'scan'} // Non-editable jika mode scan
                            />
                        )}
                    />
                    {mode === 'manual' && (
                        <button 
                            onClick={handleManualButtonClick}
                            className="btn btn-primary mt-2"
                        >
                            Cari Barcode
                        </button>
                    )}
                </div>

                {/* Input Nama Material */}
                <div className="mb-6">
                    <Controller
                        name="materialName"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label="Nama Material"
                                type="text"
                                placeholder="Nama material akan terisi otomatis"
                                control={control}
                                {...field}
                                disabled // Non-editable karena diisi otomatis
                            />
                        )}
                    />
                </div>

                {/* Input Jumlah Material */}
                <div className="mb-6">
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label="Jumlah Material"
                                type="number"
                                placeholder="Jumlah material akan terisi otomatis"
                                control={control}
                                {...field}
                                disabled // Non-editable karena diisi otomatis
                            />
                        )}
                    />
                </div>
            </Modal.Body>
        </Modal>
    )
}