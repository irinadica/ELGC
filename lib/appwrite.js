import { Functions } from 'appwrite';
import { Alert } from 'react-native';
import { Account,Avatars,Client, Databases, ID, Query } from 'react-native-appwrite';


export const config={
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.irina.dica.ELGC',
    projectID: '66a6ff3f0033a5974921',
    databaseID: '66a700a9000d6dc62ad3',
    userCollectionID: '66a700cb00288392150b',
    bookingCollectionID: '66a7020b001c770b9aa1',
    storageID: '66a702ee00010abca352',
    classCollectionID: '66afba7a0030ffed14b7',
    kidCollectionID: '66afe22e001924efd119',
    cartCollectionID:'66b4f4180017be8798f8',
}

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectID) 
    .setPlatform(config.platform) 
;

const account = new Account(client);
const databases= new Databases(client);

//CREATE USER

export const createUser= async (email, password, username)=>{
    try{
        const newAcc = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAcc) throw Error;

        await signIn(email,password);
        const newUser= await databases.createDocument(
            config.databaseID,
            config.userCollectionID,
            ID.unique(),
            {
                accountID : newAcc.$id,
                email,
                username,
                firstName:'',
                lastName:'',
                phone:'',
                address:'',
                kidAccount:'',
            }

        )
        return newUser;

    }catch(error){
        console.log(error);

    }

}

//SIGN IN

export const signIn= async (email, password)=>
{
    try {
        const session= await account.createEmailPasswordSession(email,password);
        return session;
    } catch (error) {
        throw new Error(error)
    }
}

//SIGN OUT
export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

//GET CURRENT USER
export const getCurrentUser= async ()=>{
    try {
        const currentAccount= await account.get();

        if(!currentAccount) throw Error;

        const currentUser= await databases.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal('accountID', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
} 

export const getUser= async ()=>{
    try {
        const currentAccount= await account.get();

        if(!currentAccount) throw Error;

        const currentUser= await databases.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal('accountID', currentAccount.$id)],
            

        )

        if(!currentUser) throw Error;

        return currentUser.documents;
    } catch (error) {
        console.log(error)
    }
}


//GET CURRENT Account
export const getCurrentAcc= async ()=>{
    try {
        const currentAccount= await account.get();
        if(!currentAccount) throw Error;
        return currentAccount;
    } catch (error) {
        console.log(error)
    }
}
//GET KID CLASS

export const getCurrentKidClass= async()=>{
    try {
        const currentKid= await getCurrentKid();
        if(!currentKid) throw Error;

        return currentKid.classID || [];
    } catch (error) {
        console.log(error)
    }
}

//GET USER BOOKING

export const getCurrentUserBooking= async()=>{
    try {
        const currentUser= await getCurrentUser();
        if(!currentUser) throw Error;

        return currentUser.bookingID || [];
    } catch (error) {
        console.log(error)
    }
}

//GET BOOKING DETAILS
export const getBookingDetails = async (bookingIDs)=>{
    try {
        const validBookingIDs= bookingIDs.filter(id=>typeof id==='string' && id.length<=100);
        if(validBookingIDs.length===0)
        {
            throw new Error ('No valid booking IDs found');
        }
            const bookingDetails=validBookingIDs.map(async (id)=>{
                try {
                    const booking= await databases.getDocument(
                        config.databaseID,
                        config.bookingCollectionID,
                        id
                    );
                    return booking;
                } catch (error) {
                    
                }
            });

        const bookings=await Promise.all(bookingDetails);

        return bookings.filter(booking=>booking !==null)
    } catch (error) {
        console.log(error)
    }
}

//GET CLASS DETAILS
export const getClassDetails = async (classIDs)=>{
    try {
        const validclassIDs= classIDs.filter(id=>typeof id==='string' && id.length<=100);
        if(validclassIDs.length===0)
        {
            throw new Error ('No valid class IDs found');
        }
            const classDetails=validclassIDs.map(async (id)=>{
                try {
                    const classes= await databases.getDocument(
                        config.databaseID,
                        config.classCollectionID,
                        id
                    );
                    return classes;
                } catch (error) {
                    
                }
            });

        const classes2=await Promise.all(classDetails);

        return classes2.filter(classes=>classes !==null)
    } catch (error) {
        console.log(error)
    }
}

//HANDLE BOOKING DETAILS
const handleBookingDetails= async()=>{
    try {
        const bookingIDs= await getCurrentUserBooking();
        const bookingDetails =await getBookingDetails(bookingIDs);

        return bookingDetails;
    } catch (error) {
        console.error(error)
    }
}

//UPDATE USER

export const updateCurrentUser= async (firstName, lastName, age, phone, address)=>{
    try {
        const currentUser= await getCurrentUser();
        if(!currentUser) throw new Error('User not found');

        const updatedUser = await databases.updateDocument(
            config.databaseID,
            config.userCollectionID,
            currentUser.$id,
            {
                firstName,
                lastName,
                age,
                phone,
                address,
            }
        )
        return updatedUser;

        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}


//UPDATE BOOKING
export const updateBooking= async (newBookingIDs)=>{
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) throw new Error('User not found');

        const existingBookingIDs = (currentUser.bookingID || []).filter(id => typeof id === 'string' && id.length <= 100);

        const sanitizedNewBookingIDs = newBookingIDs.filter(id => typeof id === 'string' && id.length <= 100);

        const updatedBookingIDs = [...new Set([...existingBookingIDs, ...sanitizedNewBookingIDs])];

        const updatedUser = await databases.updateDocument(
            config.databaseID,
            config.userCollectionID,
            currentUser.$id,
            {
                bookingID: updatedBookingIDs
            }
        );

        return updatedUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

//UPDATE BOOKING
export const updateClass= async (newClassIDs)=>{
    try {
        const currentUser = await getCurrentKid();
        if (!currentUser) throw new Error('Kid not found');

        const existingClassIDs = (currentUser.ClassID || []).filter(id => typeof id === 'string' && id.length <= 100);

        const sanitizedNewClassIDs = newClassIDs.filter(id => typeof id === 'string' && id.length <= 100);

        const updatedClassIDs = [...new Set([...existingClassIDs, ...sanitizedNewClassIDs])];

        const updatedUser = await databases.updateDocument(
            config.databaseID,
            config.kidCollectionID,
            currentUser.$id,
            {
                classID: updatedClassIDs
            }
        );

        return updatedUser;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

//UPDATE USER PAYMENT
export const updateUserPayment= async (cardNumber, expirationDate, cvv, billingAddress)=>{
    try {
        const currentUser= await getCurrentUser();
        if(!currentUser) throw new Error('User not found');

        const updatedUser = await databases.updateDocument(
            config.databaseID,
            config.userCollectionID,
            currentUser.$id,
            {
                cardNumber,
                expirationDate,
                cvv,
                billingAddress
            }
        )
        return updatedUser;

        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

//ADD KID TO USER
export const addKidToUser= async(kidId)=>{
    try {
        const currentUser= await getCurrentUser();

        const addKid=await databases.updateDocument(
            config.databaseID,
            config.userCollectionID,
            currentUser.$id,
            {
                kidAccount: kidId
            }
        )

        return addKid;

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

//CREATE KID
export const createKid= async (firstName,lastName,age,dob)=>{
    try{
        const currentAccount= await getCurrentAcc();
        const newKid= await databases.createDocument(
            config.databaseID,
            config.kidCollectionID,
            ID.unique(),
            {
                firstName,
                lastName,
                age,
                dob,
                accountID: currentAccount.$id
               
            }

        )
        return newKid;

    }catch(error){
        console.log(error);
        throw new Error(error);
    }

}

//GET CURRENT KID
export const getCurrentKid = async () => {
    try {
        const currentAccount = await getCurrentAcc();
        if (!currentAccount) throw new Error('Account not found');

        const currentKids = await databases.listDocuments(
            config.databaseID,
            config.kidCollectionID,
            [Query.equal('accountID', currentAccount.$id)] 
        );

        if (!currentKids.documents.length) throw new Error('No kids found for this account');

        return currentKids.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

//UPDATE KID
export const updateKid= async ( kidId, firstName, lastName, age, dob)=>{
    try {
        const currentKid= await getCurrentKid();
        const updatedKid = await databases.updateDocument(
            config.databaseID,
            config.kidCollectionID,
            kidId,
            {
                firstName: firstName || '',
                lastName: lastName || '',
                age: age || '',
                dob: dob || ''
            }
        )
        return updatedKid;

        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

//GET CLASSES
export const getClasses = async () => {
    try {
        const classes = await databases.listDocuments(
            config.databaseID,
            config.classCollectionID,
        );

        if (!classes.documents.length) throw new Error('No classes found');

        return classes.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

//GET CART CLASSES
export const getCartClasses = async (classID) => {
    try {
        const classes = await databases.getDocument(
            config.databaseID,
            config.classCollectionID,
            classID
        );
        return classes;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


//GET CART BOOKINGS
export const getCartBookings = async (bookingID) => {
    try {
        const bookings = await databases.getDocument(
            config.databaseID,
            config.bookingCollectionID,
            bookingID
        );
        return bookings;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


//ADD TO CART
export const addToCart = async(userID, classID, qty)=>{
    try {

        const existingCartItem= await databases.listDocuments(
            config.databaseID,
            config.cartCollectionID,
            [Query.equal('userID',userID), Query.equal('classID', classID)]
        )
        if(existingCartItem.documents.length>0)
        {
            Alert.alert('Item already in the cart')
            throw Error('item already in cart');
            
        }
        const cartItem= await databases.createDocument(
            config.databaseID,
            config.cartCollectionID,
            ID.unique(),
            {
                userID,
                classID,
                qty,
            }
        );
        return cartItem;
    } catch (error) {
        console.error("error add to cart", error);
        throw error;
    }
}
//ADD TO CART BOOKINGS
export const addToCartBookings = async(userID, bookingID, qty)=>{
    try {

        const existingCartItem= await databases.listDocuments(
            config.databaseID,
            config.cartCollectionID,
            [Query.equal('userID',userID), Query.equal('bookingID', bookingID)]
        )
        if(existingCartItem.documents.length>0)
        {
            Alert.alert('Item already in the cart')
            throw Error('item already in cart');
            
        }
        const cartItem= await databases.createDocument(
            config.databaseID,
            config.cartCollectionID,
            ID.unique(),
            {
                userID,
                bookingID,
                qty,
            }
        );
        return cartItem;
    } catch (error) {
        console.error("error add to cart", error);
        throw error;
    }
}

//GET CART ITEMS
export const getCartItems = async(userID)=>{
    try {
        const cartItems= await databases.listDocuments(
            config.databaseID,
            config.cartCollectionID,
            [Query.equal('userID',userID)]
        );
        return cartItems.documents;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//DELETE CART ITEM CLASSES
export const deleteCartItems = async(classID)=>{
    try {
        const cartItems= await databases.listDocuments(
            config.databaseID,
            config.cartCollectionID,
            [Query.equal('classID',classID)]
        );

        if(cartItems.documents.length === 0)
        {
            throw new Error("No cart documents have the required classID")
        }

        const documentID=cartItems.documents[0].$id;

        await databases.deleteDocument(
            config.databaseID,
            config.cartCollectionID,
            documentID
        );

        return documentID;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

//DELETE CART ITEM Bookings
export const deleteCartItemsBooking = async(bookingID)=>{
    try {
        const cartItems= await databases.listDocuments(
            config.databaseID,
            config.cartCollectionID,
            [Query.equal('bookingID',bookingID)]
        );

        if(cartItems.documents.length === 0)
        {
            throw new Error("No cart documents have the required bookingID")
        }

        const documentID=cartItems.documents[0].$id;

        await databases.deleteDocument(
            config.databaseID,
            config.cartCollectionID,
            documentID
        );

        return documentID;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

//GET BOOKINGS
export const getBookings = async () => {
    try {
        const bookings = await databases.listDocuments(
            config.databaseID,
            config.bookingCollectionID,
        );

        if (!bookings.documents.length) throw new Error('No bookings found');

        return bookings.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

