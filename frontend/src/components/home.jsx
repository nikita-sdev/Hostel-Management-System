import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Online Registration",
      desc: "Submit accommodation requests online."
    },
    {
      title: "Room Allocation",
      desc: "Smart hostel room assignment."
    },
    {
      title: "Request Tracking",
      desc: "Track approval and allocation status."
    },
    {
      title: "Admin Dashboard",
      desc: "Manage participants and rooms easily."
    }
  ];

  const steps = [
    "Register",
    "Submit Request",
    "Admin Approval",
    "Room Allocation",
    "View Status"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-gray-200">

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="max-w-6xl mx-auto px-6 py-24 text-center"
      >

        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Event Accommodation
          <span className="block text-indigo-400">
            Management Portal
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-lg max-w-3xl mx-auto">
          Simplify hostel allotment for participants attending
          events, hackathons, workshops and conferences.
        </p>


        <div className="flex justify-center gap-4 mt-10 flex-wrap">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .95 }}
            onClick={() => navigate("/signup")}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
          >
            Apply Now
          </motion.button>


          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .95 }}
            onClick={() => navigate("/login")}
            className="px-7 py-3 rounded-xl bg-gray-800 border border-gray-700"
          >
            Login
          </motion.button>

        </div>

      </motion.section>


      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {
            features.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .15 }}
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 shadow-xl"
              >

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-400">
                  {item.desc}
                </p>

              </motion.div>

            ))
          }

        </div>

      </section>


      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>


        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

          {
            steps.map((step, index) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-center"
              >

                <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
                  {index + 1}
                </div>


                <p className="mt-4">
                  {step}
                </p>


              </motion.div>

            ))
          }

        </div>

      </section>



      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 py-20"
      >


        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-gray-700 rounded-3xl p-10 text-center">


          <h2 className="text-4xl font-bold text-white">
            Ready to Request Accommodation?
          </h2>


          <p className="mt-4 text-gray-400">
            Register now and secure your stay.
          </p>


          <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Get Started
          </button>


        </div>

      </motion.section>



      <footer className="border-t border-gray-800 py-8 text-center">

        <h3 className="font-semibold text-white">
          Event Accommodation Management Portal
        </h3>

        <p className="text-gray-500 mt-2">
          Built with MERN Stack
        </p>

      </footer>


    </div>
  )

}

export default Home;