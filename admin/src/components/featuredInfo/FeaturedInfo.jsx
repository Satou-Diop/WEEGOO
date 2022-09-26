import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Nouveaux Utilisateurs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">54</span>
        </div>
        <span className="featuredSub">Mois de Septembre</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Réservations</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">32</span>
        
        </div>
        <span className="featuredSub">Mois de Septembre</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Evalution conducteur</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">69</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span> */}
        </div>
        <span className="featuredSub">Mois de Septembre</span>
      </div>
    </div>
  );
}
