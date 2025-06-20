import { FC, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MasterLayout } from '../../_metronic/layout/MasterLayout';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';
import { MenuTestPage } from '../pages/MenuTestPage';
import { WithChildren } from '../../_metronic/helpers';
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

// Lazy-loaded modules
const SalesRoutingLazy = lazy(() => import('../modules/sales/SalesRouting'));
const ProcurementRoutingLazy = lazy(() => import('../modules/procurement/ProcurementRoute'));
const InventoryRoutingLazy = lazy(() => import('../modules/inventory/InventoryRouting'));
const HrRoutingLazy = lazy(() => import('../modules/hr/HrRouting'));
const PpicRoutingLazy = lazy(() => import('../modules/ppic/PpicRouting'));
const CompanyRoutingLazy = lazy(() => import('../modules/company/CompanyRouting'));
const POSRoutingLazy = lazy(() => import('../modules/pos/PosRouting'))
const AccountingLazy = lazy(() => import('../modules/accounting/AccountingRoute'))
const CRMLazy = lazy(() => import('../modules/crm/CrmRouting'))

// Overlay Loader Component

// Suspense Wrapper Component
const SuspensedView: FC<WithChildren> = ({ children }) => {
  return <Suspense fallback={<OverlayLoader />}>{children}</Suspense>;
};

// Private Routes Component
const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        {/* Static Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        <Route
          path="crm/*"
          element={
            <SuspensedView>
              <CRMLazy />
            </SuspensedView>
          }
        />
        <Route
          path="sales/*"
          element={
            <SuspensedView>
              <SalesRoutingLazy />
            </SuspensedView>
          }
        />
        <Route
          path="procurement/*"
          element={
            <SuspensedView>
              <ProcurementRoutingLazy />
            </SuspensedView>
          }
        />
        <Route
          path="inventory/*"
          element={
            <SuspensedView>
              <InventoryRoutingLazy />
            </SuspensedView>
          }
        />
        <Route
          path="pos/*"
          element={
            <SuspensedView>
              <POSRoutingLazy/>
            </SuspensedView>
          }
        />
        <Route
          path="hr/*"
          element={
            <SuspensedView>
              <HrRoutingLazy />
            </SuspensedView>
          }
        />
        <Route
          path="ppic/*"
          element={
            <SuspensedView>
              <PpicRoutingLazy />
            </SuspensedView>
          }
        />
        <Route
          path="company/*"
          element={
            <SuspensedView>
              <CompanyRoutingLazy />
            </SuspensedView>
          }
        />
        <Route
          path="accounting/*"
          element={
            <SuspensedView>
              <AccountingLazy />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
