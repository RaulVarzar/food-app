import { createContext, useState } from 'react';

// User progress can be:
// [shopping, checkout, finished]

const UserProgress = createContext({
  progress: '',
  updateProgress: () => {},
  productsView: '',
  updateCheckoutDetails: () => {},
  checkoutDetails: {
    name: '',
    email: '',
    street: '',
    city: '',
    postcode: '',
    phone: '',
    payment: '',
    comment: '',
  },
});

export function UserProgressProvider({ children }) {
  const [productsView, setProductsView] = useState('grid');
  const [progress, setProgress] = useState('shopping');
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    postcode: '',
    phone: '',
    payment: 'cash',
    comment: '',
  });

  function updateProgress(nextStep) {
    setProgress(nextStep);
  }

  function changeView(view) {
    setProductsView(view);
  }

  function updateCheckoutDetails(field, newValue) {
    setCheckoutDetails((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  }

  return (
    <UserProgress.Provider
      value={{
        progress,
        updateProgress,
        updateCheckoutDetails,
        checkoutDetails,
        productsView,
        changeView,
      }}
    >
      {children}
    </UserProgress.Provider>
  );
}

export default UserProgress;
