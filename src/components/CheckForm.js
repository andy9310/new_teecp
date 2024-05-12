import React, { useState, useContext } from 'react';
import './UserForm.css';
import studentboard from "../images/3D.png";
import { Link } from 'react-router-dom';
import CheckHeader from '../side_components/checkside_header';
import CheckFooter from '../side_components/checkside_footer';

function CheckForm() {
    const [time, setTime] = useState(Date.now);
    const submitForm = () => {
        // Login logic here
        // console.log('Logging in', user);
        alert("submit");
    };
    return (
        <div class="container mx-auto flex flex-col w-full"> 
            <CheckHeader></CheckHeader>
            <div className="form-board">
                <div className="alert success">
                    上次自動儲存時間：{time}
                </div>
                <form className="form-sections">
                    <div className="form-section-style">
                        <h1>① 基本資料<span className="red-words">（必填）</span></h1>
                        <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                    </div>
                    <div className="form-section-style">
                        <h1>② 大學部就學資料<span className="red-words">（必填）</span></h1>
                        <div className="grid-section">
                            <div>
                                <h2>學制</h2>
                                <select dense v-model="form['2_academic']"></select>
                            </div>
                            <div>
                                <h2>畢業學校</h2>
                                <input type='text' className="input-text"></input>
                            </div>
                            <div>
                                <h2>畢業系所</h2>
                                <input type='text' className="input-text"></input>
                            </div>
                            <div>
                                <h2>畢業年月</h2>
                                <div class="tw-flex">
                                    <select dense v-model="form['2_eduy']"></select>
                                    <select dense v-model="form['2_edum']"></select>
                                </div>
                            </div>
                            <div>
                                <h2>畢業成績</h2>
                                <input type='text' className="input-text"></input>
                            </div>
                        </div>
                    </div>
                <div className="form-section-style">
                    <h1>③ 碩士在學或曾在學資料<span className="red-words">（無則免填）</span></h1>
                    <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                </div>
                <div className="form-section-style">
                    <h1>④ 博士在學或曾在學資料<span className="red-words">（無則免填）</span></h1>
                    <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                </div>
                <div className="form-section-style">
                    <h1>⑤ 切結書<span className="red-words">（無則免填）</span></h1>
                    <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                </div>
                <div className="form-section-style">
                    <h1>⑥ 指導教授同意書<span className="red-words">（無則免填）</span></h1>
                    <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                </div>
                <div className="form-section-style">
                    <h1>⑦ 就學研究計畫<span className="red-words">（無則免填）</span></h1>
                    <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                </div>
                <div className="form-section-style">
                    <h1>⑦ 歷年成績單<span className="red-words">（無則免填）</span></h1>
                    <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                </div>
                <div className="form-section-style">
                    <h1>⑧ 名次證明書<span className="red-words">（無則免填）</span></h1>
                    <div className="grid-section">
                            <div>
                                <h2>准考證號碼</h2>
                                <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" placeholder="由本所填寫"></input>
                            </div>
                            <div>
                                <h2>本校報名流水號</h2>
                                <input type='text' className="input-text" dense v-model="form.regID"></input>
                            </div>
                            <div>
                                <h2>姓名</h2>
                                <input type='text'  className="input-text" dense v-model="form.name"></input>
                            </div>
                            <div>
                                <h2>身分證字號</h2>
                                <input type='text' className="input-text" dense v-model="form.identity" placeholder="A123456789或外國AA12345678"></input>
                            </div>
                            <div>
                                <h2>出生年</h2>
                                <select dense></select>
                            </div>
                            <div>
                                <h2>手機號碼</h2>
                                <input type='text' className="input-text" dense v-model="form.phone" placeholder="09XX-XXXXXX"></input>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <input type='text' className="input-text" dense readonly></input>
                            </div>
                        </div>
                </div>
                <div className="form-section-style">
                    <h1>⑨ 研討會論文<span className="red-words">（無則免填）</span></h1>
                    <div className="detail-section">
                        <details className="detail-style">
                            <summary>研討會論文1</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>
                        <details className="detail-style">
                            <summary>研討會論文2</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>    
                        <details className="detail-style">
                            <summary>研討會論文3</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>            
                    </div>
                </div>
                <div className="form-section-style">
                    <h1>⑩ 建教計畫研究報告<span className="red-words">（無則免填）</span></h1>
                    <div className="detail-section">
                        <details className="detail-style">
                            <summary>研究報告1</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>
                        <details className="detail-style">
                            <summary>研究報告2</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>    
                        <details className="detail-style">
                            <summary>研究報告3</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>            
                    </div>
                </div>
                <div className="form-section-style">
                    <h1>⑪ 修課課程報告<span className="red-words">（無則免填）</span></h1>
                    <div className="detail-section">
                        <details className="detail-style">
                            <summary>課程報告1</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>
                        <details className="detail-style">
                            <summary>課程報告2</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>    
                        <details className="detail-style">
                            <summary>課程報告3</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>            
                    </div>
                </div>
                <div className="form-section-style">
                    <h1>⑫ 其他有助審查資料<span className="red-words">（無則免填）</span></h1>
                    <div className="detail-section">
                        <details className="detail-style">
                            <summary>審查資料1</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>
                        <details className="detail-style">
                            <summary>審查資料2</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>    
                        <details className="detail-style">
                            <summary>審查資料3</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>            
                    </div>
                </div>
                <div className="form-section-style">
                    <h1>⑬ 外語能力證明<span className="red-words">（無則免填）</span></h1>
                    <div className="detail-section">
                        <details className="detail-style">
                            <summary>外語能力證明1</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>
                        <details className="detail-style">
                            <summary>外語能力證明2</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>    
                        <details className="detail-style">
                            <summary>外語能力證明3</summary>
                            <h2>名稱</h2>
                            <input type='text' className="input-text" prefix="9020" dense v-model="form.admission" ></input>
                        </details>            
                    </div>
                </div>
                
            </form>
            <div className="button-section">
                <div >
                    <button >手動儲存</button>
                    <p >管理端為求謹慎，沒有自動儲存功能</p>
                </div>
                <div >
                    <button onClick={submitForm} >送出表單</button>
                    <p className="red-words">一經送出即無法修改</p>
                </div>
                <div >
                    <button ><a href='../files/login-check.pdf' download className='button-download'>列印登錄確認表</a></button>
                    <p >列印後請簽名上傳臺大網路報名系統</p>
                </div>
            </div>
            
            {/* <Document v-show="printing" :ID="ID" class="printable" ref="document" :form="form"></Document> */}
            </div>
            <CheckFooter></CheckFooter>
        </div>
        
          
    );
}
export default CheckForm;