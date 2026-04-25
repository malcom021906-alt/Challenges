import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { rocketOutline, trophyOutline, statsChartOutline } from 'ionicons/icons';
import MisionesPage from '../../pages/MisionesPage';
import RankingPage from '../../pages/RankingPage';
import ResultadosPage from '../../pages/ResultadosPage';
import Mision1Page from '../../pages/Mision1Page';
import Mision2Page from '../../pages/Mision2Page';
import Mision3Page from '../../pages/Mision3Page';

const MainTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/misiones" component={MisionesPage} />
        <Route exact path="/app/misiones/1" component={Mision1Page} />
        <Route exact path="/app/misiones/2" component={Mision2Page} />
        <Route exact path="/app/misiones/3" component={Mision3Page} />
        <Route exact path="/app/ranking" component={RankingPage} />
        <Route exact path="/app/resultados" component={ResultadosPage} />
        <Route exact path="/app">
          <Redirect to="/app/misiones" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" id="main-tab-bar">
        <IonTabButton tab="misiones" href="/app/misiones" >
          <IonIcon icon={rocketOutline} />
          <IonLabel>Misiones</IonLabel>
        </IonTabButton>

        <IonTabButton tab="ranking" href="/app/ranking" >
          <IonIcon icon={trophyOutline} />
          <IonLabel>Ranking</IonLabel>
        </IonTabButton>

        <IonTabButton tab="resultados" href="/app/resultados" >
          <IonIcon icon={statsChartOutline} />
          <IonLabel>Resultados</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
