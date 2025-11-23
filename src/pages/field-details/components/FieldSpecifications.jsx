import React from 'react';
import Icon from '../../../components/AppIcon';

const FieldSpecifications = ({ field = {} }) => {
  const defaultField = {
    name: "ملعب الأبطال - Terrain des Champions",
    size: "11x11",
    surface: "عشب صناعي - Gazon artificiel",
    lighting: true,
    changingRooms: 2,
    parking: true,
    capacity: 22,
    pricePerHour: 120,
    currency: "MAD",
    facilities: [
      { name: "غرف تغيير الملابس - Vestiaires", icon: "Home", available: true },
      { name: "إضاءة ليلية - Éclairage nocturne", icon: "Lightbulb", available: true },
      { name: "موقف سيارات - Parking", icon: "Car", available: true },
      { name: "دش ساخن - Douches chaudes", icon: "Droplets", available: true },
      { name: "مقاعد للمتفرجين - Gradins", icon: "Users", available: false },
      { name: "كافيتيريا - Cafétéria", icon: "Coffee", available: false }
    ],
    rules: [
      "يُمنع التدخين داخل الملعب - Interdiction de fumer sur le terrain",
      "الحد الأقصى للاعبين 22 لاعب - Maximum 22 joueurs",
      "يجب ارتداء أحذية رياضية مناسبة - Chaussures de sport obligatoires",
      "مسؤولية الإصابات على اللاعبين - Responsabilité des blessures aux joueurs"
    ]
  };

  const fieldData = { ...defaultField, ...field };

  const getSizeDisplay = (size) => {
    const sizeMap = {
      '5x5': 'خماسي - 5 vs 5',
      '7x7': 'سباعي - 7 vs 7',
      '11x11': 'كامل - 11 vs 11'
    };
    return sizeMap?.[size] || size;
  };

  return (
    <div className="space-y-6">
      {/* Field Overview */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          مواصفات الملعب - Spécifications du terrain
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Maximize" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الحجم - Taille</p>
              <p className="font-medium text-foreground">{getSizeDisplay(fieldData?.size)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Grass" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">السطح - Surface</p>
              <p className="font-medium text-foreground">{fieldData?.surface}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">السعة - Capacité</p>
              <p className="font-medium text-foreground">{fieldData?.capacity} لاعب - joueurs</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">السعر - Prix</p>
              <p className="font-medium text-foreground font-mono">
                {fieldData?.pricePerHour} {fieldData?.currency}/ساعة - heure
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Home" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">غرف التغيير - Vestiaires</p>
              <p className="font-medium text-foreground">{fieldData?.changingRooms} غرف - salles</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={fieldData?.lighting ? "Lightbulb" : "LightbulbOff"} size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الإضاءة - Éclairage</p>
              <p className="font-medium text-foreground">
                {fieldData?.lighting ? "متوفرة - Disponible" : "غير متوفرة - Non disponible"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Facilities */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          المرافق المتاحة - Installations disponibles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fieldData?.facilities?.map((facility, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border ${
                facility?.available
                  ? 'bg-success/5 border-success/20 text-success' :'bg-muted/50 border-border text-muted-foreground'
              }`}
            >
              <Icon 
                name={facility?.available ? "CheckCircle" : "XCircle"} 
                size={18} 
                className={facility?.available ? "text-success" : "text-muted-foreground"}
              />
              <Icon name={facility?.icon} size={16} />
              <span className="text-sm font-medium">{facility?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Rules and Policies */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          قوانين الملعب - Règlement du terrain
        </h3>
        
        <div className="space-y-3">
          {fieldData?.rules?.map((rule, index) => (
            <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
              <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{rule}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          معلومات الاتصال - Informations de contact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Phone" size={18} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">الهاتف - Téléphone</p>
              <p className="font-medium text-foreground font-mono">+212 6 12 34 56 78</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Mail" size={18} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">البريد الإلكتروني - Email</p>
              <p className="font-medium text-foreground">contact@terrabook.ma</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Clock" size={18} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">ساعات العمل - Horaires</p>
              <p className="font-medium text-foreground">06:00 - 23:00</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="MapPin" size={18} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">العنوان - Adresse</p>
              <p className="font-medium text-foreground">الدار البيضاء، المغرب</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldSpecifications;