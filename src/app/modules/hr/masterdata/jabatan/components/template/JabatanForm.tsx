import { FC, useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "@metronic/layout/components/form/molecules/InputField";
import Dropdown from "/media/logos/Dropdown.svg?url";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { DetailView, Modules } from "../../core/_models";
import { getErrorMessage } from "../../../../../../helper/getErrorMessage";
import axiosInstancePar from "../../../../../../../service/axiosInstanceNoCompany";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

interface JabatanFormData {
  name: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Nama jabatan wajib diisi")
    .max(255, "Nama jabatan maksimal 255 karakter")
    .matches(
      /^[A-Za-z\s]+$/,
      "Nama jabatan hanya boleh mengandung huruf dan spasi"
    ),
});

const JabatanForm: FC<{
  setSubmissionDate: (date: string) => void;
  formTitle: string;
  submitButtonLabel: string;
  successMessage: string;
  headTitle: string;
  buttonTitle: string;
  message: string;
}> = ({
  setSubmissionDate,
  formTitle,
  submitButtonLabel,
  successMessage,
  headTitle,
  buttonTitle,
  message,
}) => {
  const { id } = useParams();
  const [modules, setModules] = useState<Modules[]>([]);

  const [isAksesClose, setIsAksesClose] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState<number>(-1);
  const [isPengajuanOpen, setIsPengajuanOpen] = useState<number>(-1);
  const [isLaporanOpen, setIsLaporanOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const handleConfirmData = useRef<JabatanFormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newId, setNewId] = useState("");
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState<PermissionsType[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<JabatanFormData>({
    resolver: yupResolver(schema),
    mode: "onChange", // Validate on change
    defaultValues: {
      name: "",
    },
  });

  const name = watch("name");

  const isValid = name.length > 0;

  const getData = async (id?: string) => {
    if (!id) return;
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/hr/master-data/position/${id}`);
      const data: DetailView = res.data.data;
      console.log({ getData: data });
      reset({
        name: data.name,
      });
      const initialPermissions: any[] = data.permissions
        .map((item) => {
          return item.submodules.map((subMod) =>
            subMod.submodules.map((subSubMod) => {
              return {
                id: subSubMod.permission.id,
                sub_module_id: subSubMod.permission.sub_module_id,
                approve: subSubMod.permission.approve,
                create: subSubMod.permission.create,
                delete: subSubMod.permission.delete,
                update: subSubMod.permission.update,
                view: subSubMod.permission.view,
                position_id: subSubMod.permission.position_id,
                submodule: subSubMod.permission.submodule,
              };
            })
          );
        })
        .flat(Infinity)
        .sort((a: any, b: any) => a.sub_module_id - b.sub_module_id);
      setPermissions(initialPermissions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const getModules = async (id?: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/hr/master-data/position/module`);
      const data: Modules[] = res.data.data;
      console.log({ getModules: data });
      setModules(data);
      if (!id) {
        const initialPermissions: any[] = data
          .map((item) => {
            return item.sub_modules.map((subMod) =>
              subMod.sub_sub_modules.map((subSubMod) => {
                return {
                  sub_module_id: subSubMod.id,
                  approve: false,
                  create: false,
                  delete: false,
                  update: false,
                  view: false,
                };
              })
            );
          })
          .flat(Infinity)
          .sort((a: any, b: any) => a.sub_module_id - b.sub_module_id);
        console.log({ initialPermissions });
        setPermissions(initialPermissions);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModules(id);
  }, [id]);

  const goingBack = () => {
    navigate("../");
  };

  const handleChange = (
    sub_module_id: number,
    change: "create" | "approve" | "delete" | "update" | "view" | "all",
    value: boolean
  ) => {
    if (change === "all") {
      setPermissions((prev) =>
        prev.map((item) => {
          if (item.sub_module_id === sub_module_id) {
            return {
              ...item,
              approve: value,
              create: value,
              delete: value,
              update: value,
              view: value,
            };
          }
          return item;
        })
      );
      return;
    }
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.sub_module_id === sub_module_id) {
          const newData = { ...item, [change]: value };
          if (
            newData.approve &&
            newData.create &&
            newData.delete &&
            newData.update &&
            newData.view
          ) {
            const inputAll = document.getElementById(
              sub_module_id.toString()
            ) as HTMLInputElement | undefined;
            if (inputAll) inputAll.checked = true;
          }
          return newData;
        }
        return item;
      })
    );
    if (!value) {
      const inputAll = document.getElementById(sub_module_id.toString()) as
        | HTMLInputElement
        | undefined;
      if (inputAll) inputAll.checked = false;
    }
  };

  console.log({ permissions });

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        name,
        position_permissions: permissions,
      };
      console.log({ payload });
      let response;
      if (!id) {
        response = await axiosInstance.post(
          `/hr/master-data/position`,
          payload
        );
        setNewId(response.data.data.id);
      } else {
        response = await axiosInstance.put(
          `/hr/master-data/position/${id}`,
          payload
        );
        await getData();
      }
      console.log({ response });
      setIsSuccessModalVisible(true);
    } catch (error) {
      let errorMessage = getErrorMessage(error);
      if (errorMessage == "duplicated key not allowed") {
        errorMessage = "Nama Jabatan: harus unique";
      }
      setFailedMessage(errorMessage);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="font-secondary">
      {isLoading && <OverlayLoader />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsModalVisible(true);
        }}
      >
        {/* Form Nama Jabatan */}
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-4">{formTitle}</h3>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="Nama Jabatan"
                control={control}
                placeholder="Masukkan nama Jabatan"
                errors={errors}
                type="text"
              />
            )}
          />
        </div>

        {/* Akses */}
        <div className="card p-5 w-100">
          {/* Bagian Akses (Selalu Terbuka) */}
          <div className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2">
            <button
              type="button"
              className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2"
              onClick={() => setIsAksesClose(!isAksesClose)}
            >
              <div className="d-flex align-items-center">
                <h5>Akses</h5>
              </div>
              <img
                src={Dropdown}
                alt="Dropdown"
                className="h-5px me-2"
                style={{
                  transform: isAksesClose ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>
          </div>

          {!isAksesClose && (
            <div className="card p-5 w-100">
              {/* Konten Akses (Selalu Ditampilkan) */}
              {modules.map((module, index) => (
                <div key={index} className="ml-4">
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2"
                    onClick={() => {
                      setIsSalesOpen((prev) => (prev === index ? -1 : index));
                      setIsPengajuanOpen(-1);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <h5>{module.name}</h5>
                    </div>
                    <img
                      src={Dropdown}
                      alt="Dropdown"
                      className="h-5px me-2"
                      style={{
                        transform:
                          isSalesOpen === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>

                  {isSalesOpen === index && (
                    <div>
                      {module.sub_modules.map((subMod, sIndex) => (
                        <div key={sIndex} className="card p-5 w-100 mb-4">
                          <button
                            type="button"
                            className="d-flex align-items-center justify-content-between w-100 border-0 bg-transparent p-2"
                            onClick={() =>
                              setIsPengajuanOpen((prev) =>
                                prev === sIndex ? -1 : sIndex
                              )
                            }
                          >
                            <div className="d-flex align-items-center">
                              <h5>{subMod?.name || "-"}</h5>
                            </div>
                            <img
                              src={Dropdown}
                              alt="Dropdown"
                              className="h-5px me-2"
                              style={{
                                transform:
                                  isPengajuanOpen === sIndex
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.2s ease",
                              }}
                            />
                          </button>

                          {isPengajuanOpen === sIndex && (
                            <div className="col-md-12">
                              {subMod.sub_sub_modules.map(
                                (subSubMod, ssIndex) => (
                                  <div key={ssIndex} className="row">
                                    <div className="col-md-2">
                                      <div className="text-left px-2 py-3">
                                        {subSubMod?.name || "-"}
                                      </div>
                                    </div>
                                    <div className="col-md-1">
                                      <div className="form-check form-check-inline py-2">
                                        <label
                                          className="form-label"
                                          htmlFor="view"
                                        >
                                          All
                                        </label>
                                        <input
                                          id={subSubMod.id.toString()}
                                          className="form-check-input"
                                          type="checkbox"
                                          onChange={(e) =>
                                            handleChange(
                                              subSubMod.id,
                                              "all",
                                              e.target.checked
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                    {[
                                      { label: "View", value: "view" },
                                      { label: "Create", value: "create" },
                                      { label: "Edit", value: "update" },
                                      { label: "Delete", value: "delete" },
                                      { label: "Approved", value: "approve" },
                                    ].map((perm, pIndex) => {
                                      const findValue = permissions.find(
                                        (item) =>
                                          item.sub_module_id === subSubMod.id
                                      );
                                      const value = findValue
                                        ? findValue[
                                            perm.value as
                                              | "view"
                                              | "create"
                                              | "update"
                                              | "delete"
                                              | "approve"
                                          ]
                                        : false;
                                      return (
                                        <div
                                          key={pIndex}
                                          className={
                                            pIndex === 4 || pIndex === 3
                                              ? "col-md-1"
                                              : "col-md-2"
                                          }
                                        >
                                          <div className="form-check form-check-inline py-2">
                                            <label
                                              className="form-label"
                                              htmlFor="view"
                                            >
                                              {perm.label}
                                            </label>
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={value}
                                              onChange={(e) =>
                                                handleChange(
                                                  subSubMod.id,
                                                  perm.value as any,
                                                  e.target.checked
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end mb-8 mt-4">
          <button
            onClick={goingBack}
            type="button"
            className="btn border border-gray-500 px-12 py-2 me-4"
          >
            Batal
          </button>
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-primary px-12 py-4"
            // disabled={!isValid}
          >
            {submitButtonLabel}
          </button>
        </div>

        {failedMessage && (
          <FailedModal
            closeModal={() => setFailedMessage(null)}
            message={failedMessage}
            confirmLabel={buttonTitle}
          />
        )}

        {isModalVisible && (
          <ConfirmModal
            handleSubmit={onSubmit}
            closeModal={() => setIsModalVisible(false)}
            headTitle={headTitle}
            confirmButtonLabel={buttonTitle}
            buttonTitle={buttonTitle}
            cancelButtonLabel="Batalkan"
            message={message}
          />
        )}

        {isSuccessModalVisible && (
          <SuccessModal
            closeModal={() => {
              setIsSuccessModalVisible(false);
              if (!id) {
                navigate(`/hr/masterdata/jabatan/detail/${newId}`);
              }
            }}
            successMessage={successMessage}
          />
        )}
      </form>
    </div>
  );
};

export default JabatanForm;

type PermissionsType =
  | {
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
      approve: boolean;
      sub_module_id: number;
    }
  | {
      id: string;
      view: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
      approve: boolean;
      sub_module_id: number;
      position_id: string;
      submodule: {
        id: number;
        name: string;
        parent_sub_module: string;
        module: {
          id: number;
          name: string;
        };
        module_id: number;
      };
    };
