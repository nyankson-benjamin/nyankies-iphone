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
export const Phones: FC = () => {
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
    initialDetails,
  } = useGetPhoneDetails();
  const { setDetails, setCondition, setImages, images, condition } =
    useAddPhone();
 

  const formik = useFormik({
    initialValues: {
      ...initialDetails,
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
    condition === "";

    const state = {
        brand: selectedPhone,
        model: selectedModel,
        condition: condition,
        details: formik.values,
        images: images,
    }
  const handleSubmit = () => {
    console.log(state);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectComponent
            options={[
              { label: "Brand New", value: "new" },
              { label: "Refurbished", value: "refa" },
              { label: "Used", value: "used" },
            ]}
            onChange={(e) => {
              setCondition(e);
            }}
            placeholder="Condition"
            key={count.toString()}
            showSearch={false}
            disabled={!selectedModel}
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
        <Textarea
          className="w-full"
          placeholder="Description"
          {...formik.getFieldProps("description")}
        />
        <AddImages handleSetImages={setImages} />
        <Button
          className="w-full mt-2"
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </>
      {/* )} */}
    </div>
  );
};
