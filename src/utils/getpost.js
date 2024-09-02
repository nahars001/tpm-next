import axios from 'axios';
import fs from 'fs';

const API_URL = 'https://newtpm.secureclouddns.net/wp-json/wp/v2/pages/108238';

const USERNAME = 'admin'; // JWT username
const PASSWORD = 'pass'; // JWT password

async function getToken() {
    try {
        const response = await axios.post('https://newtpm.secureclouddns.net/wp-json/jwt-auth/v1/token', {
            username: USERNAME,
            password: PASSWORD
        });
        return response.data.token;
    } catch (error) {
        console.error('Token fetch error:', error);
        process.exit(1);
    }
}

async function fetchContent() {
    try {
        console.log('Fetching current content...');
        const response = await axios.get(API_URL);
        console.log('Content fetched successfully.');
        return response.data;
    } catch (error) {
        console.error('Fetch error:', error);
        process.exit(1);
    }
}

async function updateContent() {
    try {
        const token = await getToken();
        const currentContent = await fetchContent();

        // Modify the content correctly
        const modifiedContent = {
            ...currentContent,
            content: {
                ...currentContent.content,
                rendered: currentContent.content.rendered.replace(/UAE/g, 'India') + ` Updated at: ${new Date().toISOString()}`
            }
        };

        const updateObject = {
            title: `Updated Title ${new Date().toISOString()}`,
            content: modifiedContent,  // This should target the main content
            status: 'publish'
        };

        console.log('Updating content...');

        // Use PUT instead of POST
        const updateResponse = await axios.post(API_URL, updateObject, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Log the response for debugging
        console.log('Response data:', updateResponse.data);
        console.log('Response status:', updateResponse.status);
        console.log('Response headers:', updateResponse.headers);

        // Write the response data to a file
        const jsonString = JSON.stringify(updateResponse.data, null, 2);
        fs.writeFile('output.json', jsonString, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('File written successfully');
            }
        });

        // Optional: Fetch the content again to verify the update
        // const updatedContent = await fetchContent();
        // if (updatedContent.content.rendered.includes(modifiedContent)) {
        //     console.log('Content updated successfully!');
        // } else {
        //     console.log('Content update failed or not reflected immediately.');
        // }

    } catch (error) {
        console.error('Update post error:', error.response?.data || error.message);
        process.exit(1);
    }
}

//updateContent();




async function updatePageMeta() {
    try {
        const token = await getToken();
        // Ensure metadata is a properly formatted JSON string
        const metastring = JSON.stringify(metadata);


        const updateResponse = await axios.put(
            API_URL,
            {
                'meta': {
                    '_elementor_data': []
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Update meta response:', updateResponse.data);
        console.log('Response meta status:', updateResponse.status);

    } catch (error) {
        console.error('Update error:', error.response?.data || error.message);
        process.exit(1);
    }
}



// Update page meta for a specific page

updatePageMeta();






const metadata = [
    {
        "id": "3ff976a",
        "elType": "container",
        "settings": {
            "flex_direction": "column",
            "content_width": "full",
            "margin": {
                "unit": "px",
                "top": "0",
                "right": "0",
                "bottom": "0",
                "left": "0",
                "isLinked": false
            },
            "padding": {
                "unit": "px",
                "top": "0",
                "right": "0",
                "bottom": "0",
                "left": "0",
                "isLinked": false
            },
            "hover_parallax": [
                {
                    "layer_position_vr": {
                        "unit": "%",
                        "size": 30
                    },
                    "layer_position_hr": {
                        "unit": "%",
                        "size": 40
                    },
                    "_id": "985aaf0"
                },
                {
                    "layer_position_vr": {
                        "unit": "%",
                        "size": 60
                    },
                    "layer_position_hr": {
                        "unit": "%",
                        "size": 20
                    },
                    "_id": "6fa0454"
                }
            ]
        },
        "elements": [
            {
                "id": "4ce77fd",
                "elType": "container",
                "settings": {
                    "flex_direction": "column",
                    "content_width": "full",
                    "margin": {
                        "unit": "px",
                        "top": "0",
                        "right": "0",
                        "bottom": "0",
                        "left": "0",
                        "isLinked": false
                    },
                    "padding": {
                        "unit": "px",
                        "top": "0100",
                        "right": "0",
                        "bottom": "0100",
                        "left": "0",
                        "isLinked": false
                    },
                    "hover_parallax": [
                        {
                            "layer_position_vr": {
                                "unit": "%",
                                "size": 30
                            },
                            "layer_position_hr": {
                                "unit": "%",
                                "size": 40
                            },
                            "_id": "ee6eacb"
                        },
                        {
                            "layer_position_vr": {
                                "unit": "%",
                                "size": 60
                            },
                            "layer_position_hr": {
                                "unit": "%",
                                "size": 20
                            },
                            "_id": "b984dc0"
                        }
                    ],
                    "background_background": "classic",
                    "background_image": {
                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2023\/12\/Untitled-design-2023-12-17T125401.730.jpg",
                        "id": 1424,
                        "size": "",
                        "alt": "",
                        "source": "library"
                    },
                    "background_position": "center center",
                    "background_repeat": "no-repeat",
                    "background_size": "cover",
                    "background_overlay_background": "classic",
                    "background_overlay_color": "#000000"
                },
                "elements": [
                    {
                        "id": "ee43993",
                        "elType": "widget",
                        "settings": {
                            "title": "Stainless Steel 321H Flanges",
                            "align": "center",
                            "_margin": {
                                "unit": "px",
                                "top": "0",
                                "right": "0",
                                "bottom": "0",
                                "left": "0",
                                "isLinked": false
                            },
                            "header_size": "h1",
                            "title_color": "#FFFFFF"
                        },
                        "elements": [],
                        "widgetType": "heading"
                    },
                    {
                        "id": "1e2bef7",
                        "elType": "widget",
                        "settings": {
                            "editor": "<p><a href=\"https:\/\/newtpm.secureclouddns.net\/\">Home<\/a> &gt; <a href=\"https:\/\/newtpm.secureclouddns.net\/stainless-steel\/\">Stainless Steel<\/a>\u00a0&gt;Stainless Steel 321H Flanges<\/p>",
                            "align": "center",
                            "text_color": "#FFFFFF",
                            "typography_typography": "custom",
                            "typography_font_family": "Roboto",
                            "typography_font_weight": "500"
                        },
                        "elements": [],
                        "widgetType": "text-editor"
                    }
                ],
                "isInner": true
            }
        ],
        "isInner": false
    },
    {
        "id": "7e8297d",
        "elType": "container",
        "settings": {
            "flex_direction": "row",
            "flex_gap": {
                "unit": "px",
                "size": 0,
                "column": "0",
                "row": "0"
            },
            "hover_parallax": [
                {
                    "layer_position_vr": {
                        "unit": "%",
                        "size": 30
                    },
                    "layer_position_hr": {
                        "unit": "%",
                        "size": 40
                    },
                    "_id": "0b35b7d"
                },
                {
                    "layer_position_vr": {
                        "unit": "%",
                        "size": 60
                    },
                    "layer_position_hr": {
                        "unit": "%",
                        "size": 20
                    },
                    "_id": "aba74a0"
                }
            ]
        },
        "elements": [
            {
                "id": "86cd5ce",
                "elType": "container",
                "settings": {
                    "flex_direction": "column",
                    "content_width": "full",
                    "width": {
                        "unit": "%",
                        "size": ""
                    },
                    "hover_parallax": [
                        {
                            "layer_position_vr": {
                                "unit": "%",
                                "size": 30
                            },
                            "layer_position_hr": {
                                "unit": "%",
                                "size": 40
                            },
                            "_id": "71246eb"
                        },
                        {
                            "layer_position_vr": {
                                "unit": "%",
                                "size": 60
                            },
                            "layer_position_hr": {
                                "unit": "%",
                                "size": 20
                            },
                            "_id": "995706d"
                        }
                    ]
                },
                "elements": [
                    {
                        "id": "8a028ee",
                        "elType": "container",
                        "settings": {
                            "flex_direction": "column",
                            "content_width": "full",
                            "width": {
                                "unit": "%",
                                "size": ""
                            },
                            "hover_parallax": [
                                {
                                    "layer_position_vr": {
                                        "unit": "%",
                                        "size": 30
                                    },
                                    "layer_position_hr": {
                                        "unit": "%",
                                        "size": 40
                                    },
                                    "_id": "07c8ed9"
                                },
                                {
                                    "layer_position_vr": {
                                        "unit": "%",
                                        "size": 60
                                    },
                                    "layer_position_hr": {
                                        "unit": "%",
                                        "size": 20
                                    },
                                    "_id": "6056813"
                                }
                            ]
                        },
                        "elements": [
                            {
                                "id": "fcbfafe",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Manufacturer, Exporter and Supplier in Dubai, India",
                                    "title_color": "#0B497C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 35,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "3f8b749",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Threaded Flanges Price In Sharjah, DIN 1.4547  Stainless Steel 321H Socket Weld Flanges Exporter In Dubai, Stainless Steel 321H Flanges Dealer In Dubai, India. <span style=\"text-align: var(--text-align);\"><\/span><br>",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 30,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "header_size": "h3",
                                    "content_width": "full"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "b661b8e",
                                "elType": "widget",
                                "settings": {
                                    "title": "Table of Contents",
                                    "headings_by_tags": [
                                        "h2"
                                    ],
                                    "exclude_headings_by_selector": [],
                                    "marker_view": "bullets",
                                    "background_color": "#F0F0F0",
                                    "border_color": "#000000",
                                    "loader_color": "#000000",
                                    "header_text_color": "#000000",
                                    "item_text_color_normal": "#000000",
                                    "marker_color": "#000000"
                                },
                                "elements": [],
                                "widgetType": "table-of-contents"
                            },
                            {
                                "id": "29073b4",
                                "elType": "widget",
                                "settings": {
                                    "text_color": "#000000",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Poppins",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 16,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "400",
                                    "editor": "<div class=\"flex flex-grow flex-col max-w-full\"><div class=\"min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 juice:w-full juice:items-end overflow-x-auto gap-2\" dir=\"auto\" data-message-author-role=\"assistant\" data-message-id=\"5a9cd892-dc66-415a-bc81-915444b01140\"><div class=\"flex w-full flex-col gap-1 juice:empty:hidden juice:first:pt-[3px]\"><div class=\"markdown prose w-full break-words dark:prose-invert dark\"><p>Stainless steel 321H flanges are mainly alloyed with 17-19% chromium, 9-12% nickel, and 0.04-0.10% high carbon, titanium is added to stabilize the system to provide good resistance to oxidation and corrosion, especially at high-temperature regions , up to 900\u00b0C. Their high strength and intergranular corrosion resistance make them ideal for applications in the aerospace and petrochemical industries. Benefits include great durability, corrosion resistance, and excellent performance under extreme conditions.<\/p><\/div><\/div><\/div><\/div>"
                                },
                                "elements": [],
                                "widgetType": "text-editor"
                            },
                            {
                                "id": "9ea89e0",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Specifications",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    }
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "b4cd200",
                                "elType": "widget",
                                "settings": {
                                    "text_color": "#000000",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Poppins",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 16,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "400",
                                    "editor": "<div class=\"mt-30 mb-35\"><div class=\"table-responsive\"><table class=\"table table-bordered\"><tbody><tr><th>Specifications List<\/th><td>ASTM A182 \/ ASME SA182<\/td><\/tr><tr><th>Class \/ Pressure Rating<\/th><td>150#, 300#, 600#, 900#, 1500#, 2500#, PN6, PN10, PN16, PN25, PN40, PN64 etc.<\/td><\/tr><tr><th>Size Chart<\/th><td>1\/2\u2033 (15 NB) to 48\u2033 (1200NB)<\/td><\/tr><tr><th>ASTM Standards<\/th><td>ANSI\/ASME B16.5, B16.48, BS4504, B 16.47 Series A &amp; B, BS 10, EN-1092, DIN, etc.<\/td><\/tr><tr><th>Standard Flange<\/th><td>ANSI, ASME, BS, DIN, EN etc.<\/td><\/tr><\/tbody><\/table><\/div><\/div>"
                                },
                                "elements": [],
                                "widgetType": "text-editor"
                            },
                            {
                                "id": "a223051",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Chemical Composition",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    }
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "069f2c2",
                                "elType": "widget",
                                "settings": {
                                    "text_color": "#000000",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Poppins",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 16,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "400",
                                    "editor": "<div class=\"table-responsive\">\n<table class=\"table table-bordered\">\n<tbody>\n<tr>\n<th>Grade<\/th>\n<th>C<\/th>\n<th>Mn<\/th>\n<th>Si<\/th>\n<th>P<\/th>\n<th>S<\/th>\n<th>Cr<\/th>\n<th>N<\/th>\n<th>Ni<\/th>\n<th>Ti<\/th>\n<\/tr>\n<tr>\n<th>SS 321<\/th>\n<td>0.08 max<\/td>\n<td>2.0 max<\/td>\n<td>1.0 max<\/td>\n<td>0.045 max<\/td>\n<td>0.030 max<\/td>\n<td>17.00 - 19.00<\/td>\n<td>0.10 max<\/td>\n<td>9.00 - 12.00<\/td>\n<td>5(C+N) \u2013 0.70 max<\/td>\n<\/tr>\n<\/tbody>\n<\/table>\n<\/div>"
                                },
                                "elements": [],
                                "widgetType": "text-editor"
                            },
                            {
                                "id": "1e6fa97",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Manufacturers In Dubai, UNS S32109 Flanges Price In Sharjah, Stainless Steel 321H Flanges  Manufacturer In Dubai, India.",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 30,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "header_size": "h3"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "700fa6d",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Mechanical Properties",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    }
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "df59877",
                                "elType": "widget",
                                "settings": {
                                    "text_color": "#000000",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Poppins",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 16,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "400",
                                    "editor": "<div class=\"table-responsive\">\n<table class=\"table table-bordered\">\n<tbody>\n<tr>\n<th>Density<\/th>\n<th>Melting Point<\/th>\n<th>Tensile Strength<\/th>\n<th>Yield Strength (0.2%Offset)<\/th>\n<th>Elongation<\/th>\n<\/tr>\n<tr>\n<td>8.0 g\/cm3<\/td>\n<td>1457 \u00b0C (2650 \u00b0F)<\/td>\n<td>Psi \u2013 75000 , MPa \u2013 515<\/td>\n<td>Psi \u2013 30000 , MPa \u2013 205<\/td>\n<td>35 %<\/td>\n<\/tr>\n<\/tbody>\n<\/table>\n<\/div>"
                                },
                                "elements": [],
                                "widgetType": "text-editor"
                            },
                            {
                                "id": "fe15ab9",
                                "elType": "widget",
                                "settings": {
                                    "title": "Top Stainless Steel 321H Flanges Manufacturing Company in Dubai",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    }
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "90f4c96",
                                "elType": "widget",
                                "settings": {
                                    "text_color": "#000000",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Poppins",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 16,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "400",
                                    "editor": "<p>At PipingMart, we take pride in being the <b>largest supplier and manufacturer in the India<\/b>, offering cutting-edge solutions for all your piping needs. With state-of-the-art production plants strategically located in the India, we boast a vast inventory of over 25,000 tons of premium-quality materials readily available in stock.<\/p>"
                                },
                                "elements": [],
                                "widgetType": "text-editor"
                            },
                            {
                                "id": "fa3a2f2",
                                "elType": "container",
                                "settings": {
                                    "hover_parallax": [
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 30
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 40
                                            },
                                            "_id": "696ef31"
                                        },
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 60
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 20
                                            },
                                            "_id": "6e26737"
                                        }
                                    ],
                                    "background_background": "classic",
                                    "background_image": {
                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2023\/12\/12-1.jpg",
                                        "id": 1416,
                                        "size": "",
                                        "alt": "",
                                        "source": "library"
                                    },
                                    "background_position": "center center",
                                    "background_repeat": "no-repeat",
                                    "background_size": "cover",
                                    "background_overlay_background": "classic",
                                    "background_overlay_color": "#000000",
                                    "background_overlay_opacity": {
                                        "unit": "px",
                                        "size": 0.5100000000000000088817841970012523233890533447265625,
                                        "sizes": []
                                    },
                                    "padding": {
                                        "unit": "px",
                                        "top": "020",
                                        "right": "020",
                                        "bottom": "020",
                                        "left": "020",
                                        "isLinked": false
                                    }
                                },
                                "elements": [
                                    {
                                        "id": "b876dda",
                                        "elType": "widget",
                                        "settings": {
                                            "title": "Contact us to get a quick quote for your requirement.",
                                            "header_size": "p",
                                            "align": "center",
                                            "title_color": "#64D9FF"
                                        },
                                        "elements": [],
                                        "widgetType": "heading"
                                    },
                                    {
                                        "id": "d632dd2",
                                        "elType": "widget",
                                        "settings": {
                                            "title": "We offer These Stainless Steel 321H Flanges as per DIN, ISO, JIS or ANSI Standard.",
                                            "header_size": "p",
                                            "align": "center",
                                            "title_color": "#FFFFFF",
                                            "typography_typography": "custom",
                                            "typography_font_family": "Roboto",
                                            "typography_font_size": {
                                                "unit": "px",
                                                "size": 20,
                                                "sizes": []
                                            },
                                            "typography_font_weight": "600"
                                        },
                                        "elements": [],
                                        "widgetType": "heading"
                                    },
                                    {
                                        "id": "3fa64aa",
                                        "elType": "widget",
                                        "settings": {
                                            "text": "Request a Quote",
                                            "align": "center",
                                            "selected_icon": {
                                                "value": "fas fa-arrow-right",
                                                "library": "fa-solid"
                                            },
                                            "icon_align": "right",
                                            "button_text_color": "#000000",
                                            "background_color": "#61CACE",
                                            "__dynamic__": {
                                                "link": "[elementor-tag id=\"458d9f0\" name=\"popup\" settings=\"%7B%22popup%22%3A%22286%22%7D\"]"
                                            }
                                        },
                                        "elements": [],
                                        "widgetType": "button"
                                    }
                                ],
                                "isInner": true
                            },
                            {
                                "id": "fa2a0a2",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Lapped Joint Flanges Price In India, Manufacturer of UNS S32109 Stainless Steel 321H Flanges In Dubai, India.",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 30,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "header_size": "h3"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "f5b9686",
                                "elType": "widget",
                                "settings": {
                                    "title": "Advantages of Stainless Steel 321H Flanges",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    }
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "93c2073",
                                "elType": "widget",
                                "settings": {
                                    "image": {
                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/08\/Advantages-of-Stainless-Steel-321H-Flanges_.jpg",
                                        "id": 108586,
                                        "size": "",
                                        "alt": "",
                                        "source": "library"
                                    }
                                },
                                "elements": [],
                                "widgetType": "image"
                            },
                            {
                                "id": "4c74a45",
                                "elType": "widget",
                                "settings": {
                                    "text_color": "#000000",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Poppins",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 16,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "400",
                                    "editor": "<ul><li><b>Water resistance: <\/b>Stainless Steel 321H flanges are highly resistant to water and moisture, making them ideal for use in environments exposed to water or humidity. This resistance prevents rust and corrosion, ensuring reliable performance in various applications.<\/li><li><b>High strength: <\/b>Known for their exceptional tensile strength, Stainless Steel 321H flanges can withstand high pressure and mechanical stress. This strength makes them suitable for demanding industrial applications where durability and reliability are crucial.<\/li><li><b>Versatility:<\/b> Stainless Steel 321H flanges offer versatility across different industries due to their ability to perform well under a range of temperatures and conditions. They can be used in chemical processing, petrochemical, and aerospace applications.<\/li><li><b>Easy to manufacture: <\/b>These flanges are relatively easy to machine and fabricate, allowing for efficient production and customization. Their adaptability in manufacturing processes ensures they can be produced to precise specifications for various applications.<\/li><li><b>Longevity:<\/b> Stainless Steel 321H flanges are designed for long-term use, with a resistance to high temperatures and corrosive environments that extends their service life. This longevity reduces the need for frequent replacements, providing cost-effective and reliable performance.<\/li><\/ul>"
                                },
                                "elements": [],
                                "widgetType": "text-editor"
                            },
                            {
                                "id": "1f2deb8",
                                "elType": "widget",
                                "settings": {
                                    "title": "Types of Stainless Steel 321H Flanges",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    }
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "86611ba",
                                "elType": "container",
                                "settings": {
                                    "hover_parallax": [
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 30
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 40
                                            },
                                            "_id": "3869ad4"
                                        },
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 60
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 20
                                            },
                                            "_id": "9aa65be"
                                        }
                                    ]
                                },
                                "elements": [
                                    {
                                        "id": "9d57ee0",
                                        "elType": "container",
                                        "settings": {
                                            "flex_direction": "row",
                                            "flex_gap": {
                                                "unit": "px",
                                                "size": 0,
                                                "column": "0",
                                                "row": "0"
                                            },
                                            "hover_parallax": [
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 30
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 40
                                                    },
                                                    "_id": "fcf06b2"
                                                },
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 60
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 20
                                                    },
                                                    "_id": "be0149d"
                                                }
                                            ]
                                        },
                                        "elements": [
                                            {
                                                "id": "813cad3",
                                                "elType": "container",
                                                "settings": {
                                                    "flex_direction": "column",
                                                    "content_width": "full",
                                                    "width": {
                                                        "unit": "%",
                                                        "size": "33.3333"
                                                    },
                                                    "hover_parallax": [
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 30
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 40
                                                            },
                                                            "_id": "181f2e8"
                                                        },
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 60
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 20
                                                            },
                                                            "_id": "8e3dc2e"
                                                        }
                                                    ]
                                                },
                                                "elements": [
                                                    {
                                                        "id": "a5df557",
                                                        "elType": "widget",
                                                        "settings": {
                                                            "image": {
                                                                "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/06\/Alloy-20-ASTM-B462-Thereded-Flanges-in-India.jpg",
                                                                "id": 77490,
                                                                "size": "",
                                                                "alt": "",
                                                                "source": "library"
                                                            },
                                                            "caption_source": "custom",
                                                            "caption": "Stainless Steel 321H Flanges Thereded Flanges",
                                                            "image_border_radius": {
                                                                "unit": "px",
                                                                "top": "0",
                                                                "right": "0",
                                                                "bottom": "0",
                                                                "left": "0",
                                                                "isLinked": false
                                                            },
                                                            "caption_align": "center",
                                                            "text_color": "#000000",
                                                            "caption_typography_typography": "custom",
                                                            "caption_typography_font_family": "Roboto Condensed",
                                                            "caption_typography_font_size": {
                                                                "unit": "px",
                                                                "size": 20,
                                                                "sizes": []
                                                            },
                                                            "caption_typography_font_weight": "600",
                                                            "caption_typography_font_style": "normal",
                                                            "_box_shadow_box_shadow_type": "yes"
                                                        },
                                                        "elements": [],
                                                        "widgetType": "image"
                                                    }
                                                ],
                                                "isInner": true
                                            },
                                            {
                                                "id": "3b8e0a3",
                                                "elType": "container",
                                                "settings": {
                                                    "flex_direction": "column",
                                                    "content_width": "full",
                                                    "width": {
                                                        "unit": "%",
                                                        "size": "33.3333"
                                                    },
                                                    "hover_parallax": [
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 30
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 40
                                                            },
                                                            "_id": "181f2e8"
                                                        },
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 60
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 20
                                                            },
                                                            "_id": "8e3dc2e"
                                                        }
                                                    ]
                                                },
                                                "elements": [
                                                    {
                                                        "id": "4e9b73a",
                                                        "elType": "widget",
                                                        "settings": {
                                                            "image": {
                                                                "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/08\/Stainless-Steel-321H-Flanges-Industrial-Flanges-in-India.jpg",
                                                                "id": 108501,
                                                                "size": "",
                                                                "alt": "Stainless Steel 321H Flanges Industrial Flanges in India",
                                                                "source": "library"
                                                            },
                                                            "caption_source": "custom",
                                                            "caption": "Stainless Steel 321H Flanges Industrial Flanges",
                                                            "image_border_radius": {
                                                                "unit": "px",
                                                                "top": "0",
                                                                "right": "0",
                                                                "bottom": "0",
                                                                "left": "0",
                                                                "isLinked": false
                                                            },
                                                            "caption_align": "center",
                                                            "text_color": "#000000",
                                                            "caption_typography_typography": "custom",
                                                            "caption_typography_font_family": "Roboto Condensed",
                                                            "caption_typography_font_size": {
                                                                "unit": "px",
                                                                "size": 20,
                                                                "sizes": []
                                                            },
                                                            "caption_typography_font_weight": "600",
                                                            "caption_typography_font_style": "normal",
                                                            "_box_shadow_box_shadow_type": "yes"
                                                        },
                                                        "elements": [],
                                                        "widgetType": "image"
                                                    }
                                                ],
                                                "isInner": true
                                            },
                                            {
                                                "id": "f097af0",
                                                "elType": "container",
                                                "settings": {
                                                    "flex_direction": "column",
                                                    "content_width": "full",
                                                    "width": {
                                                        "unit": "%",
                                                        "size": "33.3333"
                                                    },
                                                    "hover_parallax": [
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 30
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 40
                                                            },
                                                            "_id": "181f2e8"
                                                        },
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 60
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 20
                                                            },
                                                            "_id": "8e3dc2e"
                                                        }
                                                    ]
                                                },
                                                "elements": [
                                                    {
                                                        "id": "7be15d8",
                                                        "elType": "widget",
                                                        "settings": {
                                                            "image": {
                                                                "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/08\/Stainless-Steel-321H-Flanges-in-India.jpg",
                                                                "id": 108500,
                                                                "size": "",
                                                                "alt": "Stainless Steel 321H Flanges in India",
                                                                "source": "library"
                                                            },
                                                            "caption_source": "custom",
                                                            "caption": "Stainless Steel 321H Flanges",
                                                            "image_border_radius": {
                                                                "unit": "px",
                                                                "top": "0",
                                                                "right": "0",
                                                                "bottom": "0",
                                                                "left": "0",
                                                                "isLinked": false
                                                            },
                                                            "caption_align": "center",
                                                            "text_color": "#000000",
                                                            "caption_typography_typography": "custom",
                                                            "caption_typography_font_family": "Roboto Condensed",
                                                            "caption_typography_font_size": {
                                                                "unit": "px",
                                                                "size": 20,
                                                                "sizes": []
                                                            },
                                                            "caption_typography_font_weight": "600",
                                                            "caption_typography_font_style": "normal",
                                                            "_box_shadow_box_shadow_type": "yes"
                                                        },
                                                        "elements": [],
                                                        "widgetType": "image"
                                                    }
                                                ],
                                                "isInner": true
                                            }
                                        ],
                                        "isInner": true
                                    },
                                    {
                                        "id": "65f067d",
                                        "elType": "container",
                                        "settings": {
                                            "flex_direction": "row",
                                            "flex_gap": {
                                                "unit": "px",
                                                "size": 0,
                                                "column": "0",
                                                "row": "0"
                                            },
                                            "hover_parallax": [
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 30
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 40
                                                    },
                                                    "_id": "fcf06b2"
                                                },
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 60
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 20
                                                    },
                                                    "_id": "be0149d"
                                                }
                                            ]
                                        },
                                        "elements": [
                                            {
                                                "id": "57e2269",
                                                "elType": "container",
                                                "settings": {
                                                    "flex_direction": "column",
                                                    "content_width": "full",
                                                    "width": {
                                                        "unit": "%",
                                                        "size": "33.3333"
                                                    },
                                                    "hover_parallax": [
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 30
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 40
                                                            },
                                                            "_id": "181f2e8"
                                                        },
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 60
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 20
                                                            },
                                                            "_id": "8e3dc2e"
                                                        }
                                                    ]
                                                },
                                                "elements": [
                                                    {
                                                        "id": "a3840b2",
                                                        "elType": "widget",
                                                        "settings": {
                                                            "image": {
                                                                "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/08\/Stainless-Steel-321H-Weld-Neck-Flanges-in-India.jpg",
                                                                "id": 108499,
                                                                "size": "",
                                                                "alt": "Stainless Steel 321H Weld Neck Flanges in India",
                                                                "source": "library"
                                                            },
                                                            "caption_source": "custom",
                                                            "caption": "Stainless Steel 321H Weld Neck Flanges",
                                                            "image_border_radius": {
                                                                "unit": "px",
                                                                "top": "0",
                                                                "right": "0",
                                                                "bottom": "0",
                                                                "left": "0",
                                                                "isLinked": false
                                                            },
                                                            "caption_align": "center",
                                                            "text_color": "#000000",
                                                            "caption_typography_typography": "custom",
                                                            "caption_typography_font_family": "Roboto Condensed",
                                                            "caption_typography_font_size": {
                                                                "unit": "px",
                                                                "size": 20,
                                                                "sizes": []
                                                            },
                                                            "caption_typography_font_weight": "600",
                                                            "caption_typography_font_style": "normal",
                                                            "_box_shadow_box_shadow_type": "yes"
                                                        },
                                                        "elements": [],
                                                        "widgetType": "image"
                                                    }
                                                ],
                                                "isInner": true
                                            },
                                            {
                                                "id": "a13cfca",
                                                "elType": "container",
                                                "settings": {
                                                    "flex_direction": "column",
                                                    "content_width": "full",
                                                    "width": {
                                                        "unit": "%",
                                                        "size": "33.3333"
                                                    },
                                                    "hover_parallax": [
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 30
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 40
                                                            },
                                                            "_id": "181f2e8"
                                                        },
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 60
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 20
                                                            },
                                                            "_id": "8e3dc2e"
                                                        }
                                                    ]
                                                },
                                                "elements": [
                                                    {
                                                        "id": "3b202e7",
                                                        "elType": "widget",
                                                        "settings": {
                                                            "image": {
                                                                "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/08\/Stainless-Steel-321H-Slip-on-Flanges-in-India.jpg",
                                                                "id": 108498,
                                                                "size": "",
                                                                "alt": "Stainless Steel 321H Slip on Flanges in India",
                                                                "source": "library"
                                                            },
                                                            "caption_source": "custom",
                                                            "caption": "Stainless Steel 321H Slip on Flanges",
                                                            "image_border_radius": {
                                                                "unit": "px",
                                                                "top": "0",
                                                                "right": "0",
                                                                "bottom": "0",
                                                                "left": "0",
                                                                "isLinked": false
                                                            },
                                                            "caption_align": "center",
                                                            "text_color": "#000000",
                                                            "caption_typography_typography": "custom",
                                                            "caption_typography_font_family": "Roboto Condensed",
                                                            "caption_typography_font_size": {
                                                                "unit": "px",
                                                                "size": 20,
                                                                "sizes": []
                                                            },
                                                            "caption_typography_font_weight": "600",
                                                            "caption_typography_font_style": "normal",
                                                            "_box_shadow_box_shadow_type": "yes"
                                                        },
                                                        "elements": [],
                                                        "widgetType": "image"
                                                    }
                                                ],
                                                "isInner": true
                                            },
                                            {
                                                "id": "765a9fd",
                                                "elType": "container",
                                                "settings": {
                                                    "flex_direction": "column",
                                                    "content_width": "full",
                                                    "width": {
                                                        "unit": "%",
                                                        "size": "33.3333"
                                                    },
                                                    "hover_parallax": [
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 30
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 40
                                                            },
                                                            "_id": "181f2e8"
                                                        },
                                                        {
                                                            "layer_position_vr": {
                                                                "unit": "%",
                                                                "size": 60
                                                            },
                                                            "layer_position_hr": {
                                                                "unit": "%",
                                                                "size": 20
                                                            },
                                                            "_id": "8e3dc2e"
                                                        }
                                                    ]
                                                },
                                                "elements": [
                                                    {
                                                        "id": "1ed9dea",
                                                        "elType": "widget",
                                                        "settings": {
                                                            "image": {
                                                                "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/08\/Stainless-Steel-321H-Blind-Flanges-in-India.jpg",
                                                                "id": 108497,
                                                                "size": "",
                                                                "alt": "Stainless Steel 321H Blind Flanges in India",
                                                                "source": "library"
                                                            },
                                                            "caption_source": "custom",
                                                            "caption": "Stainless Steel 321H  Blind Flanges",
                                                            "image_border_radius": {
                                                                "unit": "px",
                                                                "top": "0",
                                                                "right": "0",
                                                                "bottom": "0",
                                                                "left": "0",
                                                                "isLinked": false
                                                            },
                                                            "caption_align": "center",
                                                            "text_color": "#000000",
                                                            "caption_typography_typography": "custom",
                                                            "caption_typography_font_family": "Roboto Condensed",
                                                            "caption_typography_font_size": {
                                                                "unit": "px",
                                                                "size": 20,
                                                                "sizes": []
                                                            },
                                                            "caption_typography_font_weight": "600",
                                                            "caption_typography_font_style": "normal",
                                                            "_box_shadow_box_shadow_type": "yes"
                                                        },
                                                        "elements": [],
                                                        "widgetType": "image"
                                                    }
                                                ],
                                                "isInner": true
                                            }
                                        ],
                                        "isInner": true
                                    }
                                ],
                                "isInner": true
                            },
                            {
                                "id": "f00f893",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Industrial Flanges Exporter In India, Best Price of Stainless Steel 321H Flanges Wnrf Flanges Dealer In India, Stockholder of Stainless Steel 321H Flanges Manufacturer In Dubai, India. <span style=\"text-align: var(--text-align);\"><\/span><br>",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 30,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "header_size": "h3"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "e680141",
                                "elType": "widget",
                                "settings": {
                                    "title": "Stainless Steel 321H Flanges Uses",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    }
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "ef22cbf",
                                "elType": "container",
                                "settings": {
                                    "flex_direction": "row",
                                    "flex_gap": {
                                        "unit": "px",
                                        "size": 0,
                                        "column": "0",
                                        "row": "0"
                                    },
                                    "background_background": "classic",
                                    "background_image": {
                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2023\/12\/26A1CF.jpg",
                                        "id": 1412,
                                        "size": "",
                                        "alt": "",
                                        "source": "library"
                                    },
                                    "background_position": "center left",
                                    "background_attachment": "fixed",
                                    "background_repeat": "no-repeat",
                                    "background_size": "cover",
                                    "background_overlay_background": "classic",
                                    "background_overlay_color": "#000000",
                                    "background_overlay_opacity": {
                                        "unit": "px",
                                        "size": 0.58999999999999996891375531049561686813831329345703125,
                                        "sizes": []
                                    },
                                    "hover_parallax": [
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 30
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 40
                                            },
                                            "_id": "add51db"
                                        },
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 60
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 20
                                            },
                                            "_id": "504d224"
                                        }
                                    ]
                                },
                                "elements": [
                                    {
                                        "id": "a6f0695",
                                        "elType": "container",
                                        "settings": {
                                            "flex_direction": "column",
                                            "content_width": "full",
                                            "width": {
                                                "unit": "%",
                                                "size": 50
                                            },
                                            "padding": {
                                                "unit": "px",
                                                "top": "0150",
                                                "right": "0",
                                                "bottom": "0",
                                                "left": "0",
                                                "isLinked": false
                                            },
                                            "hover_parallax": [
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 30
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 40
                                                    },
                                                    "_id": "97dc960"
                                                },
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 60
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 20
                                                    },
                                                    "_id": "428c602"
                                                }
                                            ]
                                        },
                                        "elements": [
                                            {
                                                "id": "b71fbff",
                                                "elType": "widget",
                                                "settings": {
                                                    "title": "Application Industry",
                                                    "title_color": "#FFFFFF",
                                                    "typography_typography": "custom",
                                                    "typography_font_family": "Rubik",
                                                    "typography_font_size": {
                                                        "unit": "px",
                                                        "size": 30,
                                                        "sizes": []
                                                    },
                                                    "typography_font_weight": "600"
                                                },
                                                "elements": [],
                                                "widgetType": "heading"
                                            },
                                            {
                                                "id": "13f33c0",
                                                "elType": "widget",
                                                "settings": {
                                                    "look": "line_icon",
                                                    "text": "Divider",
                                                    "color": "#FFFFFF",
                                                    "primary_color": "#FFFFFF"
                                                },
                                                "elements": [],
                                                "widgetType": "divider"
                                            },
                                            {
                                                "id": "31194f2",
                                                "elType": "widget",
                                                "settings": {
                                                    "editor": "<p>Stainless Steel 321H Flanges applications are as diverse as the industries they serve driven primarily by the aerospace, railway, construction and automotive industries with petrochemical, nuclear, medical, Oil &amp; Gas, Chemical, Pharmaceutical, Food &amp; Beverage, Nuclear, Thermal Power plants, Paper and Pulp, marine and mining, etc.<\/p>",
                                                    "align": "center",
                                                    "text_color": "#FFFFFF"
                                                },
                                                "elements": [],
                                                "widgetType": "text-editor"
                                            }
                                        ],
                                        "isInner": true
                                    },
                                    {
                                        "id": "414f62c",
                                        "elType": "container",
                                        "settings": {
                                            "flex_direction": "column",
                                            "content_width": "full",
                                            "width": {
                                                "unit": "%",
                                                "size": 25
                                            },
                                            "hover_parallax": [
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 30
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 40
                                                    },
                                                    "_id": "f46f4eb"
                                                },
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 60
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 20
                                                    },
                                                    "_id": "ae597b6"
                                                }
                                            ]
                                        },
                                        "elements": [
                                            {
                                                "id": "5046d24",
                                                "elType": "widget",
                                                "settings": {
                                                    "selected_icon": {
                                                        "value": "",
                                                        "library": ""
                                                    },
                                                    "title_text_a": "",
                                                    "description_text_a": "",
                                                    "background_a_background": "classic",
                                                    "background_a_image": {
                                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/Oil-and-Gas-Industry-4-1.jpg",
                                                        "id": 8605,
                                                        "size": "",
                                                        "alt": "",
                                                        "source": "library"
                                                    },
                                                    "background_a_position": "center center",
                                                    "background_a_repeat": "no-repeat",
                                                    "background_a_size": "cover",
                                                    "title_text_b": "Oil & Gas Industry",
                                                    "description_text_b": "",
                                                    "button_text": "",
                                                    "background_b_background": "classic",
                                                    "background_b_color": "#FFFFFF",
                                                    "border_a_border": "solid",
                                                    "border_a_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_a_color": "#26A1CF",
                                                    "border_b_border": "solid",
                                                    "border_b_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_b_color": "#26A1CF",
                                                    "title_color_b": "#000000",
                                                    "button_background_background": "gradient",
                                                    "button_background_color": "#000000",
                                                    "button_border_color": "#000000",
                                                    "_border_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    }
                                                },
                                                "elements": [],
                                                "widgetType": "flip-box"
                                            },
                                            {
                                                "id": "4905a0b",
                                                "elType": "widget",
                                                "settings": {
                                                    "selected_icon": {
                                                        "value": "",
                                                        "library": ""
                                                    },
                                                    "title_text_a": "",
                                                    "description_text_a": "",
                                                    "background_a_background": "classic",
                                                    "background_a_image": {
                                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/Aerospace-Industry-3.jpg",
                                                        "id": 8611,
                                                        "size": "",
                                                        "alt": "",
                                                        "source": "library"
                                                    },
                                                    "background_a_position": "center center",
                                                    "background_a_repeat": "no-repeat",
                                                    "background_a_size": "cover",
                                                    "title_text_b": "Aerospace Industry",
                                                    "description_text_b": "",
                                                    "button_text": "",
                                                    "background_b_background": "classic",
                                                    "background_b_color": "#FFFFFF",
                                                    "border_a_border": "solid",
                                                    "border_a_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_a_color": "#26A1CF",
                                                    "border_b_border": "solid",
                                                    "border_b_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_b_color": "#26A1CF",
                                                    "title_color_b": "#000000"
                                                },
                                                "elements": [],
                                                "widgetType": "flip-box"
                                            }
                                        ],
                                        "isInner": true
                                    },
                                    {
                                        "id": "d36c059",
                                        "elType": "container",
                                        "settings": {
                                            "flex_direction": "column",
                                            "content_width": "full",
                                            "width": {
                                                "unit": "%",
                                                "size": 25
                                            },
                                            "hover_parallax": [
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 30
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 40
                                                    },
                                                    "_id": "f46f4eb"
                                                },
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 60
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 20
                                                    },
                                                    "_id": "ae597b6"
                                                }
                                            ]
                                        },
                                        "elements": [
                                            {
                                                "id": "e431c2f",
                                                "elType": "widget",
                                                "settings": {
                                                    "selected_icon": {
                                                        "value": "",
                                                        "library": ""
                                                    },
                                                    "title_text_a": "",
                                                    "description_text_a": "",
                                                    "background_a_background": "classic",
                                                    "background_a_image": {
                                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/Petrochemical-Industry-3-1.jpg",
                                                        "id": 8606,
                                                        "size": "",
                                                        "alt": "",
                                                        "source": "library"
                                                    },
                                                    "background_a_position": "center center",
                                                    "background_a_repeat": "no-repeat",
                                                    "background_a_size": "cover",
                                                    "title_text_b": "Petro Chemical  Industry",
                                                    "description_text_b": "",
                                                    "button_text": "",
                                                    "background_b_background": "classic",
                                                    "background_b_color": "#FFFFFF",
                                                    "border_a_border": "solid",
                                                    "border_a_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_a_color": "#26A1CF",
                                                    "border_b_border": "solid",
                                                    "border_b_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_b_color": "#26A1CF",
                                                    "title_color_b": "#000000",
                                                    "button_background_background": "gradient",
                                                    "button_background_color": "#000000",
                                                    "button_border_color": "#000000",
                                                    "_border_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    }
                                                },
                                                "elements": [],
                                                "widgetType": "flip-box"
                                            },
                                            {
                                                "id": "01254a6",
                                                "elType": "widget",
                                                "settings": {
                                                    "selected_icon": {
                                                        "value": "",
                                                        "library": ""
                                                    },
                                                    "title_text_a": "",
                                                    "description_text_a": "",
                                                    "background_a_background": "classic",
                                                    "background_a_image": {
                                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/Power-Generation-2-1.jpg",
                                                        "id": 8613,
                                                        "size": "",
                                                        "alt": "",
                                                        "source": "library"
                                                    },
                                                    "background_a_position": "center center",
                                                    "background_a_repeat": "no-repeat",
                                                    "background_a_size": "cover",
                                                    "title_text_b": "Power Generation Industry",
                                                    "description_text_b": "",
                                                    "button_text": "",
                                                    "background_b_background": "classic",
                                                    "background_b_color": "#FFFFFF",
                                                    "border_a_border": "solid",
                                                    "border_a_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_a_color": "#26A1CF",
                                                    "border_b_border": "solid",
                                                    "border_b_width": {
                                                        "unit": "px",
                                                        "top": "04",
                                                        "right": "0",
                                                        "bottom": "0",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "border_b_color": "#26A1CF",
                                                    "title_color_b": "#000000"
                                                },
                                                "elements": [],
                                                "widgetType": "flip-box"
                                            }
                                        ],
                                        "isInner": true
                                    }
                                ],
                                "isInner": true
                            },
                            {
                                "id": "25d7a98",
                                "elType": "widget",
                                "settings": {
                                    "title": "Can Stainless Steel 321H Flanges be recycled after use?\n",
                                    "title_color": "#1A284C",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Roboto",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 26,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "600",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "010",
                                        "right": "0",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#E9E9E9",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "2",
                                        "right": "0",
                                        "bottom": "2",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_radius": {
                                        "unit": "px",
                                        "top": "10",
                                        "right": "010",
                                        "bottom": "010",
                                        "left": "010",
                                        "isLinked": false
                                    },
                                    "header_size": "h3"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "590526f",
                                "elType": "widget",
                                "settings": {
                                    "text_color": "#000000",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Poppins",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 16,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "400",
                                    "editor": "<div class=\"flex flex-grow flex-col max-w-full\"><div class=\"min-h-[20px] text-message flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 juice:w-full juice:items-end overflow-x-auto gap-2\" dir=\"auto\" data-message-author-role=\"assistant\" data-message-id=\"f8c062b4-ecf9-4e0e-9d84-38da410830bb\"><div class=\"flex w-full flex-col gap-1 juice:empty:hidden juice:first:pt-[3px]\"><div class=\"markdown prose w-full break-words dark:prose-invert dark\"><p><b>Yes,<\/b> Stainless Steel 321H flanges can be recycled. Stainless steel is highly recyclable and retains its properties through multiple recycling cycles, making it a sustainable material choice. Ensure proper sorting and processing to maintain quality in recycled products.<\/p><\/div><\/div><\/div><\/div>"
                                },
                                "elements": [],
                                "widgetType": "text-editor"
                            },
                            {
                                "id": "417f107",
                                "elType": "container",
                                "settings": {
                                    "hover_parallax": [
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 30
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 40
                                            },
                                            "_id": "8e3dda7"
                                        },
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 60
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 20
                                            },
                                            "_id": "18685a7"
                                        }
                                    ]
                                },
                                "elements": [
                                    {
                                        "id": "fba405c",
                                        "elType": "container",
                                        "settings": {
                                            "flex_direction": "column",
                                            "hover_parallax": [
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 30
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 40
                                                    },
                                                    "_id": "79f74bc"
                                                },
                                                {
                                                    "layer_position_vr": {
                                                        "unit": "%",
                                                        "size": 60
                                                    },
                                                    "layer_position_hr": {
                                                        "unit": "%",
                                                        "size": 20
                                                    },
                                                    "_id": "61ec875"
                                                }
                                            ]
                                        },
                                        "elements": [
                                            {
                                                "id": "6e0c2da",
                                                "elType": "widget",
                                                "settings": {
                                                    "title": "Other Material ",
                                                    "title_color": "#1A284C",
                                                    "typography_typography": "custom",
                                                    "typography_font_family": "Roboto",
                                                    "typography_font_size": {
                                                        "unit": "px",
                                                        "size": 26,
                                                        "sizes": []
                                                    },
                                                    "typography_font_weight": "600",
                                                    "_padding": {
                                                        "unit": "px",
                                                        "top": "010",
                                                        "right": "0",
                                                        "bottom": "010",
                                                        "left": "010",
                                                        "isLinked": false
                                                    },
                                                    "_background_background": "classic",
                                                    "_background_color": "#E9E9E9",
                                                    "_border_border": "solid",
                                                    "_border_width": {
                                                        "unit": "px",
                                                        "top": "2",
                                                        "right": "0",
                                                        "bottom": "2",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "_border_radius": {
                                                        "unit": "px",
                                                        "top": "10",
                                                        "right": "010",
                                                        "bottom": "010",
                                                        "left": "010",
                                                        "isLinked": false
                                                    }
                                                },
                                                "elements": [],
                                                "widgetType": "heading"
                                            },
                                            {
                                                "id": "3dd8555",
                                                "elType": "widget",
                                                "settings": {
                                                    "0": "#",
                                                    "1": "6",
                                                    "2": "1",
                                                    "3": "C",
                                                    "4": "E",
                                                    "5": "7",
                                                    "6": "0",
                                                    "carousel": [
                                                        {
                                                            "id": 2097,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/alloy-steel-flanges.jpg"
                                                        },
                                                        {
                                                            "id": 2100,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/Hastelloy-flanges.jpg"
                                                        },
                                                        {
                                                            "id": 2099,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/duplex-flanges.jpg"
                                                        },
                                                        {
                                                            "id": 2098,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/carbon-flanges-1.jpg"
                                                        },
                                                        {
                                                            "id": 2101,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/inconel-flanges.jpg"
                                                        },
                                                        {
                                                            "id": 2103,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/stainless-steel-flanges.jpg"
                                                        },
                                                        {
                                                            "id": 2104,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/super-duplex-steel-flanges-1.jpg"
                                                        },
                                                        {
                                                            "id": 2102,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/monel-flanges.jpg"
                                                        },
                                                        {
                                                            "id": 2105,
                                                            "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2024\/02\/Titanium-flanges-1.jpg"
                                                        }
                                                    ],
                                                    "thumbnail_size": "medium",
                                                    "slides_to_show": "3",
                                                    "slides_to_scroll": "3",
                                                    "link_to": "custom",
                                                    "caption_type": "caption",
                                                    "lazyload": "yes",
                                                    "autoplay_speed": 3000,
                                                    "speed": 400,
                                                    "arrows_position": "outside",
                                                    "arrows_size": {
                                                        "unit": "px",
                                                        "size": 20,
                                                        "sizes": []
                                                    },
                                                    "arrows_color": "#030303",
                                                    "dots_position": "inside",
                                                    "image_spacing": "custom",
                                                    "image_spacing_custom": {
                                                        "unit": "px",
                                                        "size": 19,
                                                        "sizes": []
                                                    },
                                                    "image_border_border": "none",
                                                    "image_border_radius": {
                                                        "unit": "px",
                                                        "top": "30",
                                                        "right": "0",
                                                        "bottom": "30",
                                                        "left": "0",
                                                        "isLinked": false
                                                    },
                                                    "caption_text_color": "#000000",
                                                    "caption_typography_typography": "custom",
                                                    "caption_typography_font_family": "Georgia",
                                                    "caption_typography_font_style": "normal",
                                                    "navigation": "arrows"
                                                },
                                                "elements": [],
                                                "widgetType": "image-carousel"
                                            }
                                        ],
                                        "isInner": true
                                    }
                                ],
                                "isInner": true
                            }
                        ],
                        "isInner": true
                    }
                ],
                "isInner": true
            },
            {
                "id": "51778e0",
                "elType": "container",
                "settings": {
                    "flex_direction": "column",
                    "content_width": "full",
                    "width": {
                        "unit": "%",
                        "size": 35
                    },
                    "hover_parallax": [
                        {
                            "layer_position_vr": {
                                "unit": "%",
                                "size": 30
                            },
                            "layer_position_hr": {
                                "unit": "%",
                                "size": 40
                            },
                            "_id": "65f4b3a"
                        },
                        {
                            "layer_position_vr": {
                                "unit": "%",
                                "size": 60
                            },
                            "layer_position_hr": {
                                "unit": "%",
                                "size": 20
                            },
                            "_id": "0596689"
                        }
                    ]
                },
                "elements": [
                    {
                        "id": "b26171b",
                        "elType": "container",
                        "settings": {
                            "flex_direction": "column",
                            "content_width": "full",
                            "width": {
                                "unit": "%",
                                "size": ""
                            },
                            "hover_parallax": [
                                {
                                    "layer_position_vr": {
                                        "unit": "%",
                                        "size": 30
                                    },
                                    "layer_position_hr": {
                                        "unit": "%",
                                        "size": 40
                                    },
                                    "_id": "aaca2fa"
                                },
                                {
                                    "layer_position_vr": {
                                        "unit": "%",
                                        "size": 60
                                    },
                                    "layer_position_hr": {
                                        "unit": "%",
                                        "size": 20
                                    },
                                    "_id": "d1bd86c"
                                }
                            ]
                        },
                        "elements": [
                            {
                                "id": "ce94245",
                                "elType": "widget",
                                "settings": {
                                    "title": "Our Products",
                                    "header_size": "h4",
                                    "title_color": "#FFFFFF",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Ropa Sans",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 28,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "500",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "7",
                                        "right": "0",
                                        "bottom": "7",
                                        "left": "10",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#0B497C",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "03",
                                        "right": "0",
                                        "bottom": "0",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_color": "#000000"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "685fb22",
                                "elType": "widget",
                                "settings": {
                                    "title": "Alloy 20",
                                    "header_size": "h4",
                                    "title_color": "#FFFFFF",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Ropa Sans",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 28,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "500",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "7",
                                        "right": "0",
                                        "bottom": "7",
                                        "left": "10",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#0B497C",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "03",
                                        "right": "0",
                                        "bottom": "0",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_color": "#000000"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "575303e",
                                "elType": "widget",
                                "settings": {
                                    "menu": "alloy-20",
                                    "layout": "vertical",
                                    "animation_line": "none",
                                    "submenu_icon": {
                                        "value": "",
                                        "library": ""
                                    },
                                    "menu_typography_typography": "custom",
                                    "menu_typography_font_family": "Roboto",
                                    "menu_typography_font_size": {
                                        "unit": "px",
                                        "size": 15,
                                        "sizes": []
                                    },
                                    "menu_typography_font_weight": "500",
                                    "color_menu_item": "#000000",
                                    "color_menu_item_hover": "#000000",
                                    "pointer_color_menu_item_hover": "#31C9FF",
                                    "pointer_width": {
                                        "unit": "px",
                                        "size": 1,
                                        "sizes": []
                                    },
                                    "padding_horizontal_menu_item": {
                                        "unit": "px",
                                        "size": 5,
                                        "sizes": []
                                    },
                                    "padding_vertical_menu_item": {
                                        "unit": "px",
                                        "size": 8,
                                        "sizes": []
                                    },
                                    "menu_space_between": {
                                        "unit": "px",
                                        "size": 0,
                                        "sizes": []
                                    }
                                },
                                "elements": [],
                                "widgetType": "nav-menu"
                            },
                            {
                                "id": "a512873",
                                "elType": "widget",
                                "settings": {
                                    "title": "Other Materials",
                                    "header_size": "h4",
                                    "title_color": "#FFFFFF",
                                    "typography_typography": "custom",
                                    "typography_font_family": "Ropa Sans",
                                    "typography_font_size": {
                                        "unit": "px",
                                        "size": 28,
                                        "sizes": []
                                    },
                                    "typography_font_weight": "500",
                                    "_padding": {
                                        "unit": "px",
                                        "top": "7",
                                        "right": "0",
                                        "bottom": "7",
                                        "left": "10",
                                        "isLinked": false
                                    },
                                    "_background_background": "classic",
                                    "_background_color": "#0B497C",
                                    "_border_border": "solid",
                                    "_border_width": {
                                        "unit": "px",
                                        "top": "03",
                                        "right": "0",
                                        "bottom": "0",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "_border_color": "#000000"
                                },
                                "elements": [],
                                "widgetType": "heading"
                            },
                            {
                                "id": "790c351",
                                "elType": "widget",
                                "settings": {
                                    "menu": "other-material",
                                    "layout": "vertical",
                                    "animation_line": "none",
                                    "submenu_icon": {
                                        "value": "",
                                        "library": ""
                                    },
                                    "menu_typography_typography": "custom",
                                    "menu_typography_font_family": "Roboto",
                                    "menu_typography_font_size": {
                                        "unit": "px",
                                        "size": 15,
                                        "sizes": []
                                    },
                                    "menu_typography_font_weight": "500",
                                    "color_menu_item": "#000000",
                                    "color_menu_item_hover": "#000000",
                                    "pointer_color_menu_item_hover": "#31C9FF",
                                    "pointer_width": {
                                        "unit": "px",
                                        "size": 1,
                                        "sizes": []
                                    },
                                    "padding_horizontal_menu_item": {
                                        "unit": "px",
                                        "size": 5,
                                        "sizes": []
                                    },
                                    "padding_vertical_menu_item": {
                                        "unit": "px",
                                        "size": 8,
                                        "sizes": []
                                    },
                                    "menu_space_between": {
                                        "unit": "px",
                                        "size": 0,
                                        "sizes": []
                                    }
                                },
                                "elements": [],
                                "widgetType": "nav-menu"
                            },
                            {
                                "id": "371337d",
                                "elType": "container",
                                "settings": {
                                    "background_background": "classic",
                                    "background_image": {
                                        "url": "https:\/\/newtpm.secureclouddns.net\/wp-content\/uploads\/2023\/12\/Untitled-design-2023-12-17T123828.484.jpg",
                                        "id": 1422,
                                        "size": "",
                                        "alt": "",
                                        "source": "library"
                                    },
                                    "background_position": "center center",
                                    "background_repeat": "no-repeat",
                                    "background_size": "cover",
                                    "background_overlay_background": "classic",
                                    "background_overlay_color": "#000000",
                                    "background_overlay_opacity": {
                                        "unit": "px",
                                        "size": 0.68000000000000004884981308350688777863979339599609375,
                                        "sizes": []
                                    },
                                    "padding": {
                                        "unit": "px",
                                        "top": "040",
                                        "right": "0",
                                        "bottom": "040",
                                        "left": "0",
                                        "isLinked": false
                                    },
                                    "hover_parallax": [
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 30
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 40
                                            },
                                            "_id": "3df5d05"
                                        },
                                        {
                                            "layer_position_vr": {
                                                "unit": "%",
                                                "size": 60
                                            },
                                            "layer_position_hr": {
                                                "unit": "%",
                                                "size": 20
                                            },
                                            "_id": "2a0c1fd"
                                        }
                                    ]
                                },
                                "elements": [
                                    {
                                        "id": "1e0650a",
                                        "elType": "widget",
                                        "settings": {
                                            "title": "Have Any Question?",
                                            "header_size": "h5",
                                            "align": "center",
                                            "title_color": "#FFFFFF"
                                        },
                                        "elements": [],
                                        "widgetType": "heading"
                                    },
                                    {
                                        "id": "ff0e99a",
                                        "elType": "widget",
                                        "settings": {
                                            "editor": "<p>Call Us: <a href=\"tel:+917208967217\">+91 7208967217<\/a><\/p><p>Email: <a href=\"mailto:sales@newtpm.secureclouddns.net\">sales@newtpm.secureclouddns.net<\/a><\/p>",
                                            "align": "center",
                                            "text_color": "#FFFFFF",
                                            "typography_typography": "custom",
                                            "typography_font_family": "Roboto",
                                            "typography_font_weight": "700"
                                        },
                                        "elements": [],
                                        "widgetType": "text-editor"
                                    }
                                ],
                                "isInner": true
                            }
                        ],
                        "isInner": true
                    }
                ],
                "isInner": true
            }
        ],
        "isInner": false
    }
]




