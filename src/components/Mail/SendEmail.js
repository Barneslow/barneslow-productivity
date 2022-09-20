import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailAction } from "../../store/emailSlice";

const formSchema = Yup.object({
  recipientEmail: Yup.string().required("Recipient Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message Email is required"),
});

const SendEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const userProfile = location.state?._id;
  const mailStore = useSelector((state) => state.email);

  const { appError, serverError, loading, isMailSent } = mailStore;

  const formik = useFormik({
    initialValues: {
      recipientEmail: email,
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      dispatch(sendEmailAction(values));
    },
    validationSchema: formSchema,
  });

  if (isMailSent) {
    navigate(`/profile/${userProfile}`);
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Send Mesage
          {/* Email title */}
          <span className="text-green-300">email title</span>
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          {serverError ||
            (appError && (
              <h2 className="text-center text-lg text-red-500">
                {serverError} {appError}
              </h2>
            ))}{" "}
        </p>
        <p className="mt-2 text-center text-sm text-gray-600">
          {/* {emailSent && <div>Sent</div>} */}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Recipient Email
              </label>
              {/* Email message */}
              <div className="mt-1">
                <input
                  value={formik.values.recipientEmail}
                  onChange={formik.handleChange("recipientEmail")}
                  onBlur={formik.handleBlur("recipientEmail")}
                  disabled
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                {/* Subject */}
                <input
                  value={formik.values.subject}
                  onChange={formik.handleChange("subject")}
                  onBlur={formik.handleBlur("subject")}
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              {/* email message */}
              <textarea
                value={formik.values.message}
                onChange={formik.handleChange("message")}
                onBlur={formik.handleBlur("message")}
                rows="5"
                cols="10"
                className="block w-full appearance-none rounded-lg border border-gray-200 bg-transparent py-3 px-3 text-center text-base leading-tight  text-gray-600 focus:border-gray-500 focus:bg-transparent  focus:outline-none"
                type="text"
              ></textarea>
              {/* err here */}
              <div className="text-red-500">
                {formik.touched.message && formik.errors.message}
              </div>
            </div>
            {/* Submit btn */}
            <div>
              {loading ? (
                <button
                  disabled
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm"
                >
                  Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
