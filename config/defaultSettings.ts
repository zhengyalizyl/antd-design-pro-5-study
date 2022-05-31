import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'yang ruixuan',
  pwa: false,
  // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',//这里存在争议
  iconfontUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',//https://github.com/ant-design/pro-components/blob/master/packages/layout/src/components/SiderMenu/BaseMenu.tsx
};

export default Settings;
