import IndexMain from './IndexMain';
import MenuBar from './MenuBar';
const WebPage = () => {
    return ( 
        <div>
            <MenuBar/>
            <div id = "content">
                <IndexMain />
            </div>
        </div>
     );
}
 
export default WebPage;