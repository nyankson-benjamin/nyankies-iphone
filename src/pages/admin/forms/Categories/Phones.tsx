import { FC, useState, useEffect } from "react";
import { Input } from "../../../../components/ui/Input";
import { sortItems } from "../../../../utils/cn";
import { useGetPhoneDetails } from "../../../../hooks/admin/useGetPhoneDetails";
import SelectComponent from "../../../../components/ui/SelectComponent";
import Loader from "../../../../components/loaders/Loader";
import { phoneDetailsSchema } from "../../../../schemas/schemas";
import { useFormik } from "formik";
import { useAddPhone } from "../../../../store/admin/useAddPhone";
import { Button } from "../../../../components/ui/Button";
import AddImages from "./AddImages";
import { Textarea } from "../../../../components/ui/Textarea";
import API from "../../../../services/axiosInstance";
import { useAlert } from "../../../../hooks/useAlert";
import { initialState } from "../../../../store/admin/useAddPhone";
import { useImages } from "../../../../store/imageStore";

export const Phones: FC<{ setOpen: (open: boolean) => void }> = ({
  setOpen,
}) => {
  const {
    phones,
    selectedPhone,
    setSelectedPhone,
    selectedModel,
    setSelectedModel,
    isLoading,
    phoneModels,
    count,
    phoneDetails,
  } = useGetPhoneDetails();
  const {
    setDetails,
    setCondition,
    setImages,
    // images,
    condition,
    category,
    reset,
  } = useAddPhone();

  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const { images } = useImages();
  const formik = useFormik({
    initialValues: {
      ...initialState,
      price: 0,
      stock: 0,
      condition: "",
      description: "",
    },
    validationSchema: phoneDetailsSchema,
    onSubmit: (values) => {
      setDetails(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (phoneDetails) {
      formik.setValues({
        ...phoneDetails,
        description: "",
        price: 0,
        stock: 0,
        condition: "",
        pictures: [],
      });
    }
  }, [phoneDetails]);

  const [searchTerm, setSearchTerm] = useState("");

  const isDisabled =
    formik.values.battery === "" ||
    formik.values.ram === "" ||
    formik.values.storage === "" ||
    formik.values.camera === "" ||
    formik.values.display_res === "" ||
    formik.values.display_size === "" ||
    formik.values.description === "" ||
    images.length < 2 ||
    condition === "" ||
    formik.values.price === 0 ||
    formik.values.stock === 0 ||
    formik.values.release_date === "" ||
    formik.values.body === "" ||
    formik.values.os_type === "" ||
    formik.values.display_res === "" ||
    formik.values.battery === "" ||
    formik.values.camera === "" ||
    formik.values.ram === "" ||
    formik.values.storage === "" ||
    formik.values.description?.trim().length < 10;

  const state = {
    brand: selectedPhone,
    model: selectedModel,
    condition,
    details: formik.values,
    images: images,
    category,
    price: formik.values.price,
    stock: formik.values.stock,
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await API.post("/api/add-product", state);
      if (res.status === 201) {
        showAlert("Phone added successfully", "success");
      }
      setLoading(false);
      setOpen(true);
      reset();
    } catch (error:any) {
      showAlert(error.message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      {isLoading && <Loader />}
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectComponent
            options={sortItems(phones, "label")}
            setSearchTerm={setSearchTerm}
            onChange={(e) => {
              setSelectedPhone(e as string);
            }}
            searchTerm={searchTerm}
            placeholder="Select a brand"
            searchPlaceholder="Search a brand"
          />

          <SelectComponent
            options={phoneModels()}
            setSearchTerm={setSearchTerm}
            onChange={(e) => {
              setSelectedModel(e as string);
            }}
            searchTerm={searchTerm}
            placeholder="Select a model"
            searchPlaceholder="Search a model"
            disabled={!selectedPhone}
            key={count.toString()}
          />
        </div>

        <p>Specifications</p>
        {selectedModel && !isLoading && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectComponent
                options={[
                  { label: "Brand New", value: "new" },
                  { label: "Refurbished", value: "refa" },
                  { label: "Used", value: "used" },
                ]}
                onChange={(e) => {
                  setCondition(e);
                  formik.setFieldValue("condition", e);
                }}
                placeholder="Condition"
                key={count.toString()}
                showSearch={false}
                disabled={!selectedModel}
                error={formik.errors.condition}
              />
              <Input
                className="w-full"
                // value={phoneDetails?.battery}
                error={formik.errors.battery}
                helperText={formik.errors.battery}
                placeholder="Battery"
                {...formik.getFieldProps("battery")}
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                className="w-full"
                // value={phoneDetails?.ram}
                error={formik.errors.ram}
                helperText={formik.errors.ram}
                placeholder="RAM"
                {...formik.getFieldProps("ram")}
                disabled
              />
              <Input
                className="w-full"
                // value={phoneDetails?.storage}
                error={formik.errors.storage}
                helperText={formik.errors.storage}
                placeholder="Storage"
                {...formik.getFieldProps("storage")}
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                className="w-full"
                // value={phoneDetails?.camera}
                error={formik.errors.camera}
                helperText={formik.errors.camera}
                placeholder="Camera"
                {...formik.getFieldProps("camera")}
                disabled
              />
              <Input
                className="w-full"
                // value={formik.values.network}
                error={formik.errors.os_type}
                helperText={formik.errors.os_type}
                placeholder="Network"
                {...formik.getFieldProps("os_type")}
                disabled
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                className="w-full"
                {...formik.getFieldProps("display_res")}
                value={formik.values.display_res}
                error={formik.errors.display_res}
                helperText={formik.errors.display_res}
                placeholder="Resolution"
                disabled
              />
              <Input
                className="w-full"
                {...formik.getFieldProps("display_size")}
                value={formik.values.display_size}
                error={formik.errors.display_size}
                helperText={formik.errors.display_size}
                placeholder="Display size"
                disabled
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                className="w-full"
                {...formik.getFieldProps("release_date")}
                value={formik.values.release_date}
                error={formik.errors.release_date}
                helperText={formik.errors.release_date}
                placeholder="Release date"
                disabled
              />
              <Input
                className="w-full"
                {...formik.getFieldProps("body")}
                value={formik.values.body}
                error={formik.errors.body}
                helperText={formik.errors.body}
                placeholder="Body"
                disabled
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                className="w-full"
                {...formik.getFieldProps("price")}
                value={formik.values.price}
                error={formik.errors.price}
                helperText={formik.errors.price}
                placeholder="Price (GH₵)"
              />
              <Input
                className="w-full"
                {...formik.getFieldProps("stock")}
                value={formik.values.stock}
                error={formik.errors.stock}
                helperText={formik.errors.stock}
                placeholder="Stock"
              />
            </div>
            <Textarea
              className="w-full"
              placeholder="Description"
              {...formik.getFieldProps("description")}
              error={formik.errors.description}
              helperText={formik.errors.description}
            />
          </div>
        )}
        <AddImages handleSetImages={setImages} maxSize={2} multiple={true} />
        <Button
          className="w-full mt-2"
          disabled={isDisabled}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Next
        </Button>
      </>
      {/* )} */}
    </div>
  );
};
