import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const HOST = import.meta.env.VITE_BACKEND_URI;

const formSchema = z.object({
  email: z.string().email("Enter a valid Email Address"),

  name: z.string().optional(),
  bio: z
    .string()
    .min(10, "Bio should be at least 10 characters")
    .max(50, "Bio can only have a maximum of 50 characters")
    .optional(),
});

type UserFormValues = z.infer<typeof formSchema>;

interface ErrorResponse {
  message: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      bio: "",
    },
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId || !token) return;

      try {
        setLoading(true);
        const res = await axios.get(`${HOST}/api/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token || "",
          },
        });

        setValue("email", res.data.user.email);
        setValue("name", res.data.user.name);
        setValue("bio", res.data.user.bio);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [setValue, userId, token]);

  const onSubmit = async (data: UserFormValues) => {
    console.log("Form submitted:", data);

    try {
      setLoading(true);
      const res = await axios.put(`${HOST}/api/user/updatedetails`, data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token || "",
        },
      });

      toast.success("User details updated successfully");
      console.log("🚀 ~ onSubmit ~ res:", res);
    } catch (error) {
      console.error("Error updating user details:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data) {
          toast.error(axiosError.response.data.message);
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 space-y-6 sm:px-6">
      <Heading title="User Details" className="my-3" />
      <Separator className="mb-6" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <Card>
            <CardContent className="space-y-6 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input {...register("name")} placeholder="E.g. Jane Doe" />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  placeholder="E.g. jane@example.com"
                  readOnly
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  {...register("bio")}
                  placeholder="Enter your bio"
                  className="mt-1"
                  style={{ minHeight: "100px" }}
                />
                {errors.bio && (
                  <p className="text-red-500">{errors.bio.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pt-6">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
