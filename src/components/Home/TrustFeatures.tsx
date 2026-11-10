import { Leaf, Truck, ShieldCheck, Handshake } from "lucide-react";

const features = [
  {
    id: 1,
    title: "100% Natural",
    description: "No harmful additives",
    icon: Leaf,
  },
  {
    id: 2,
    title: "Nationwide Delivery",
    description: "Fresh to your doorstep",
    icon: Truck,
  },
  {
    id: 3,
    title: "Trusted Quality",
    description: "Sourced from local farmers",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Supporting Farmers",
    description: "A brighter Bangladesh",
    icon: Handshake,
  },
];

const TrustFeatures = () => {
  return (
    <section className="relative bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-green-50"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-700">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustFeatures;
