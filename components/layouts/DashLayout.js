import DashHeader from '@/components/layouts/shared/DashHeader';
import Footer from '@/components/layouts/shared/Footer';
import { useRouter } from 'next/router';
import Meta from './shared/Meta';

const PrintLayout = (props) => {
  const router = useRouter();
  const { children, title='AIA TEST', metaDescription='', metaImage, user, loading } = props;
  return (
    <>
      <Meta title={title} metaDescription={metaDescription} metaImage={metaImage} />
      <DashHeader user={user} loading={loading} />
      {children}
      <Footer />
    </>
  )
}

export default PrintLayout;