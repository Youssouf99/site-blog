import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page non trouvée
      </h2>
      <p className="text-lg text-gray-600">
        Désolé, la page que vous recherchez est introuvable.
      </p>
    </div>
  );
};

export default NotFoundPage;
