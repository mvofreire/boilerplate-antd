import HomeConfig from "./home/home.config";
import RegisterConfig from "./register/register.config";
import LoginConfig from "./login/login.config";

import DashboardConfig from "./dashboard/dashboard.config";
import ProfileConfig from "./profile/profile.config";
import LicitacoesConfig from "./licitacoes/licitacoes.config";
import LicitacaoDetailConfig from "./licitacao-detail/licitacao-detail.config";
import SystemConfig from "./configuration/configuration.config";
import FavoritesConfig from "./favorites/favorites.config";
import TopicsConfig from "./topics/topics.config";

const pagesRoutes = [
  HomeConfig,
  RegisterConfig,
  LoginConfig,
  DashboardConfig,
  ProfileConfig,
  LicitacoesConfig,
  LicitacaoDetailConfig,
  SystemConfig,
  FavoritesConfig,
  TopicsConfig
];

export const publicPages = pagesRoutes.filter(page => !page.auth);
export const privatePages = pagesRoutes.filter(page => !!page.auth);
