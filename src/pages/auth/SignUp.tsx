import AuthLayout from "../../layout/AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { fetchCityData } from "../../hooks/useCities";
import { useEffect, useState } from "react";
import { sortItems } from "../../utils/cn";
import { useRegister } from "../../hooks/auth/useRegister";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const { formik } = useRegister();

  const getCities = async () => {
    const allCities = sortItems((await fetchCityData()) as unknown as string[]);
    setCities(
      allCities
        ?.filter((city: string) => city !== "Home")
        ?.map((city: string) => ({ value: city, label: city }))
    );
  };
  useEffect(() => {
    getCities();
  }, []);

  return (
    <AuthLayout text="SignUp">
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-5">
          <Input
            type="text"
            id="name"
            {...formik.getFieldProps("name")}
            placeholder="Full name"
            label="Full name"
            error={formik.touched.name ? formik.errors.name : undefined}
          />
          <Input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            label="Email"
            error={formik.touched.email ? formik.errors.email : undefined}
          />
          <Input
            type="phone"
            id="phone"
            {...formik.getFieldProps("phone")}
            placeholder="Phone"
            label="Phone"
            error={formik.touched.phone ? formik.errors.phone : undefined}
          />
          <Input
            type="address"
            id="address"
            {...formik.getFieldProps("address")}
            placeholder="Address"
            label="Address"
            error={formik.touched.address ? formik.errors.address : undefined}
          />
          <Select
            options={cities}
            {...formik.getFieldProps("location")}
            value={formik.values.location}
            onChange={formik.handleChange}
            label="Location"
            error={formik.touched.location ? formik.errors.location : undefined}
          />

          <Input
            type="password"
            id="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
            label="Password"
            error={formik.touched.password ? formik.errors.password : undefined}
          />

          <Input
            type="password"
            id="confirm"
            {...formik.getFieldProps("confirm")}
            placeholder="Confirm password"
            label="Confirm password"
            error={formik.touched.confirm ? formik.errors.confirm : undefined}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={formik.isSubmitting}
          >
            SignUp
          </Button>
          <p className="text-sm text-center text-primaryDeep">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
