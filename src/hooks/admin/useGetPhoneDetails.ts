import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import API from "../../services/axiosInstance";
import { IPhoneDetails } from "../../types/phoneTypes";
import { useAddPhone } from "../../store/admin/useAddPhone";
import { v4 as uuidv4 } from "uuid";
interface IPhone {
  brand_name: string;
  brand_id: number;
  key: string;
  device_list: {
    device_name: string;
    device_id: number;
    key: string | number;
  }[];
}
interface Phone {
  data: IPhone[];
}
export const useGetPhoneDetails = () => {
  const { setBrand, setModel, setImages } = useAddPhone();
  const [phones, setPhones] = useState<
    {
      label: string;
      value: number | string;
      key: string | number;
      device_list: {
        label: string;
        value: number | string;
        key: string | number;
      }[];
    }[]
  >([]);

  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneDetails, setPhoneDetails] = useState<IPhoneDetails>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getPhones = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Phone>(
          import.meta.env.VITE_GSM_URL + "?route=device-list"
        );
        setPhones(
          response.data?.data?.map((phone) => ({
            label: phone.brand_name,
            value: phone.brand_id,
            key: phone.key,
            device_list: phone.device_list.map((device) => ({
              label: device.device_name,
              value: device?.key,
              key: device.key,
            })),
          })) ?? []
        );
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };
    getPhones();
  }, []);

  const phoneModels = () => {
    const selectedPhoneData = phones.find(
      (phone) => Number(phone.value) === Number(selectedPhone)
    );
    if (!selectedPhoneData) return [];
    return selectedPhoneData?.device_list;
  };

  useEffect(() => {
    setCount(count + 1);
    setBrand(selectedPhone);
  }, [selectedPhone]);

  const getPhoneDetails = async () => {
    try {
      setIsLoading(true);
      const response = await API.post<{ data: IPhoneDetails }>(
        "/api/device-details",
        {
          route: "device-detail",
          key: selectedModel,
        }
      );
      setPhoneDetails(response.data.data);
      setImages(response.data.data.pictures.map((picture) => ({
        image: picture.image,
          id: uuidv4(),
        }))
      );    
      //   setDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching phone details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (selectedModel) {
      getPhoneDetails();
    }
    setModel(selectedModel);
  }, [selectedModel]);
  const initialDetails = {
    battery: "",
    batteryType: "",
    body: "",
    camera: "",
    chipset: "",
    comment: "",
    device_image: "",
    device_name: "",
    display_res: "",
    display_size: "",
    key: "",
    ram: "",
    release_date: "",
    storage: "",
    video: "",
    os_type: "",
    network: "",
    processor: "",
    description: "",
    pictures:[]
  };

  useEffect(() => {
    setSelectedModel("");
    setPhoneDetails({
      ...initialDetails,
      pictures:[]
    });
    
  }, [selectedPhone]);

  return {
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
  };
};
