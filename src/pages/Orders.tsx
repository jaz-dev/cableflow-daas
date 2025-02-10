import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const success = searchParams.get('success');
    
    if (success === 'true') {
      toast.success('Order Placed Successfully');
      setSearchParams({});
    } else if (success === 'false') {
      toast.error('Order Placement Failed');
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  return (
    <div>
      {/* Orders page content */}
    </div>
  );
}

export default Orders;