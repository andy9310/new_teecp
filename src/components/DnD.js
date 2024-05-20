import {Reorder, useMotionValue} from 'framer-motion'
import { useState } from 'react';
import { Table } from "reactstrap";
import { useRaisedShadow } from "../side_components/use-raised-shadow";
import {Card, CardBody,Button} from "@nextui-org/react"; // use Nextui as 
import Status from './status';
import CheckHeader from '../side_components/checkside_header';
import CheckFooter from '../side_components/checkside_footer';
import {
    IonButton,
    IonItem,
    IonReorder,
    IonReorderGroup,
  } from '@ionic/react';
import DragSign from "../images/reorder-four.svg";

function DnD(){
    const [A_items, setAItems] = useState([1,2,3,4,5]);

    const [B_items, setBItems] = useState(["test","test","test"]);
    
    const [isDisabled, setIsDisabled] = useState(true);
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    function handleReorder(event) {
        console.log('Dragged from index', event.detail.from, 'to', event.detail.to); // debugv0.1.0

        event.detail.complete();
    }
    
    function toggleReorder() {
        setIsDisabled((current_state) => !current_state);
    }
    return (
        <div class="container mx-auto flex flex-col w-full">
            <CheckHeader></CheckHeader>
            
            <div align="left" class="relative">
              <p class="text-red-500"><strong>【審查開放時間:113年2月6日至113年6月1日(六)上午12時止】 </strong></p>
              <p><strong>【書面審查評分方式】 </strong></p>
              <ul>
                  <li class="style1">1.請以序號1~4表示推薦錄取名次等級，排名評分為【1】者表極力推薦優先錄取</li>
                  <li class="style1">2.專案A有{A_items.length}名學生申請，專案B有{B_items.length}名學生申請，每個等級可推薦一名(依指導意願排序)</li>
              </ul>
              <Status></Status>
            </div>
            <div class="flex flex-row justify-evenly items-center mt-2"> 
                
                <div class="flex flex-col ">
                    <h1 class="font-bold">專案A</h1>
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-white w-24 border border-zinc-950"></h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">排名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學生姓名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">組別</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1>
                            </div>
                        </div>
                        {/* <tbody class=""> */}
                            <IonReorderGroup disabled={isDisabled} onIonItemReorder={handleReorder}>
                            
                                {A_items.map((item)=>(
                                    <IonItem >
                                        <div class="bg-stone-300 justify-center">
                                                <td class="w-24 border border-zinc-950"><IonReorder slot="end"><ion-icon src={DragSign}></ion-icon></IonReorder></td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                        </div>
                                    </IonItem>
                                 ))}
                               
                            
                            </IonReorderGroup>
                        
                    </div>    
                    <div class="flex flex-row justify-evenly mt-4">
                        <button class="w-24 bg-green-400 rounded-full hover:translate-y-[-4px]" onClick={toggleReorder}>點擊解鎖</button>
                        <button class="w-24 bg-sky-500 rounded-full hover:translate-y-[-4px]" onClick={toggleReorder}>儲存</button>
                    </div>
                    
                    
                </div>
                <div class="flex flex-col ">
                    <h1 class="font-bold">專案B</h1>
                    <div class="w-full border-2 border-stone-400 bg-white">
                        <div class=" w-full justify-between ">
                            <div class="justify-between w-full flex flex-row ">
                                <h1 class="bg-white w-24 border border-zinc-950"></h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">排名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">學生姓名</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">組別</h1>
                                <h1 class="bg-sky-500 w-24 border border-zinc-950">指導教授</h1>
                            </div>
                        </div>
                        {/* <tbody class=""> */}
                            <IonReorderGroup disabled={isDisabled} onIonItemReorder={handleReorder}>
                            
                                {A_items.map((item)=>(
                                    <IonItem >
                                        <div class="bg-stone-300 justify-center">
                                                <td class="w-24 border border-zinc-950"><IonReorder slot="end"><ion-icon src={DragSign}></ion-icon></IonReorder></td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                                <td class="w-24 border border-zinc-950">{item}</td>
                                        </div>
                                    </IonItem>
                                 ))}
                               
                            
                            </IonReorderGroup>
                        
                    </div>    
                    <div class="flex flex-row justify-evenly mt-4">
                        <button class="w-24 bg-green-400 rounded-full hover:translate-y-[-4px]" onClick={toggleReorder}>點擊解鎖</button>
                        <button class="w-24 bg-sky-500 rounded-full hover:translate-y-[-4px]" onClick={toggleReorder}>儲存</button>
                    </div>
                </div>
            </div>
            <CheckFooter></CheckFooter>
        </div>
    );
}
export default DnD;


{/* <Reorder.Group class="relative w-table" axis="y" values={B_items} onReorder={setBItems}>
{B_items.map((item)=>{
    <Reorder.Item class="flex justify-between items-center w-full h-52 mb-2.5 py-3.5 px-4.5 rounded-md bg-red flex-shrink-0 cursor-grab" value={item} key={item} style={{ boxShadow, y }}>
        <Card>
            <CardBody>
                <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>
        </Card>
    </Reorder.Item>
})}
</Reorder.Group> */}
// const DottedButton = () => {
//     return (
//       <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
//         Hover me
//       </button>
//     );
//   };
  
//   export default DottedButton;
// {/* <IonItem >
//                                     <td><IonLabel>1</IonLabel></td>
//                                     <td><IonLabel>王以安</IonLabel></td>
//                                     <td><IonLabel>1</IonLabel></td>
//                                     <td><IonReorder slot="end"></IonReorder></td>
//                                 </IonItem>

//                                 <IonItem >
//                                     <td><IonLabel>1</IonLabel></td>
//                                     <td><IonLabel>1</IonLabel></td>
//                                     <td><IonLabel>1</IonLabel></td>
//                                     <td><IonReorder slot="end"></IonReorder></td>
//                                 </IonItem>

//                                 <IonItem >
//                                     <td><IonLabel>1</IonLabel></td> */}
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonReorder slot="end"></IonReorder></td>
                                // </IonItem>

                                // <IonItem >
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonReorder slot="end"></IonReorder></td>
                                // </IonItem>

                                // <IonItem >
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonLabel>1</IonLabel></td>
                                //     <td><IonReorder slot="end"></IonReorder></td>
                                // </IonItem>