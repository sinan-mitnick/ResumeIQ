function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl hover:scale-105 transition duration-300">

      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold mt-5">
        {title}
      </h3>

      <p className="text-slate-400 mt-3">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;